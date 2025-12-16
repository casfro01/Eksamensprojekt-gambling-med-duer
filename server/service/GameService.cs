using System.ComponentModel.DataAnnotations;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using Microsoft.EntityFrameworkCore;
using service.Abstractions;
using service.Models.Responses;

namespace service;

public class GameService(MyDbContext db, IMoneyHandler moneyHandler) : IGameService
{
    public Task<List<BaseGameResponse>> Get()
    {
        return db.Games
            .Include(g => g.Boards)
            .Include(g => g.WinningNumbers)
            .Select(g => new BaseGameResponse(g)).ToListAsync();
    }

    public async Task<BaseGameResponse> Get(string id)
    {
        var game = await db.Games
            .Include(g => g.Boards)
            .Include(g => g.WinningNumbers)
            .FirstOrDefaultAsync(g => g.Id == id);
        return game == null ? throw new KeyNotFoundException("Game not found") : new BaseGameResponse(game);
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