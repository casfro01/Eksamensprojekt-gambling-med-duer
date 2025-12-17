using System.ComponentModel.DataAnnotations;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using Microsoft.EntityFrameworkCore;
using service.Abstractions;
using service.Models.Responses;
using Sieve.Models;
using Sieve.Services;

namespace service;

public class GameService(MyDbContext db, IMoneyHandler moneyHandler, ISieveProcessor processor) : IGameService
{
    public Task<List<BaseGameResponse>> Get()
    {
        return db.Games
            .Include(g => g.Boards)
            .Include(g => g.WinningNumbers)
            .Select(g => new BaseGameResponse(g)).ToListAsync();
    }

    public async Task<List<ExtendedGameResponse>> Get(SieveModel sieveModel)
    {
        IQueryable<Game> query = db.Games
            .Include(g => g.Boards);
        
        query = processor.Apply(sieveModel, query);
        var games = await query.ToListAsync();
        List<ExtendedGameResponse> list = [];
        list.AddRange(games.Select(g => new ExtendedGameResponse(
            g, 
            IMoneyHandler.GetTotalRevenue(g.Boards.ToArray()),
            g.Boards.Count,
            g.Boards.Count(b => ContainsWinningNumbers(g.WinningNumbers.ToList(), b.PlayedNumbers))
            ))
        );
        return list;
    }

    private bool ContainsWinningNumbers(List<int> winningNums, List<int> boardNums)
    {
        return winningNums.All(boardNums.Contains);
    }

    public async Task<BaseGameResponse> Get(string id)
    {
        var game = await db.Games
            .Include(g => g.Boards)
            .Include(g => g.WinningNumbers)
            .FirstOrDefaultAsync(g => g.Id == id);
        return game == null ? throw new KeyNotFoundException("Game not found") : new GameWithBoardResponse(game);
    }

    public async Task<BaseGameResponse> SetWinningNumbers(WinningNumbers winningNumbers)
    {
        Validator.ValidateObject(winningNumbers, new ValidationContext(winningNumbers), true);
        var activeGame = GetCurrentGame();
        activeGame.GameStatus = GameStatus.Finished;
        activeGame.WinningNumbers = winningNumbers.numbers.ToList();
        
        await db.SaveChangesAsync();
        // activate the next game
        var nextActiveGame = GetCurrentGame();
        nextActiveGame.GameStatus = GameStatus.InProgress;
        await db.SaveChangesAsync();
        await TakeMoneyFromPeople(GetCurrentGame().Id); // hvis denne fejler så er det gg ig
        return new BaseGameResponse(activeGame);
    }

    private Game GetCurrentGame()
    {
        return db.Games
            .Include(g => g.Boards)
            //.Include(g => g.WinningNumbers)
            .OrderBy(g => g.StartDate)
            .First(g => g.GameStatus != GameStatus.Finished);
    }

    // todo : dette system skal nok laves om - der skal nok en boolean med board og games tabellen, hvor der står om spillet er betalt for - når / hvis det manuelle skema bliver lavet - så kan dette inkluderes
    private async Task TakeMoneyFromPeople(string gameId)
    {
        Game game = await db.Games
            .Include(g => g.Boards)
            .ThenInclude(b => b.Games)
            .FirstAsync(g => g.Id == gameId);

        foreach (var b in game.Boards.ToList())
        {
            var res = await moneyHandler.SubtractMoney(b.UserId, IMoneyHandler.GetBoardPrices(b.PlayedNumbers.Count), false);
            if (res) continue;
            var notFinishedGames = b.Games.Where(g => g.GameStatus != GameStatus.Finished).ToList();
            foreach (var NFgame in notFinishedGames)
                b.Games.Remove(NFgame);
        }
        
        await db.SaveChangesAsync();
    }
}