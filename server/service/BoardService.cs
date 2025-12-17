using System.ComponentModel.DataAnnotations;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using Microsoft.EntityFrameworkCore;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;
using Sieve.Models;
using Sieve.Services;

namespace service;

public class BoardService(MyDbContext db, ISieveProcessor processor): IServiceWithSieve<BaseBoardResponse, CreateBoardDto, UpdateBoardDto>
{
    public async Task<List<BaseBoardResponse>> Get(SieveModel model)
    {
        IQueryable<Board> query = db.Boards
            .Include(b => b.Games)
            .Include(b => b.User);
        query = processor.Apply(model, query);
        List<BaseBoardResponse> list = [];
        list.AddRange(query.Select(b => new ExtendedBoardResponse(b, b.Games.Count(g => g.GameStatus != GameStatus.Finished))));
        await Task.Run( () => Console.WriteLine("Fetch")); // idk, nu kører den async el. lign.
        return list;
    }

    public async Task<BaseBoardResponse> Get(string id)
    {
        var board = await db.Boards.FirstOrDefaultAsync(b => b.Id == id);
        return board == null ? throw new KeyNotFoundException("Board not found") : new BaseBoardResponse(board);
    }

    public Task<BaseBoardResponse> Delete(string id)
    {
        throw new NotImplementedException();
    }

    // for nu opdaterer den kun de nuværende uger - hvis der skal ske andet,
    // så hav lige dette i tankerne, for så skal controlleren også ændre
    // - eller man kunne flytte det ind på gameservice,
    // men der ved jeg ikke helt hvordan det skal fungere
    public async Task<BaseBoardResponse> Update(UpdateBoardDto dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        var board = db.Boards
            .Include(b => b.User)
            .Include(b => b.Games)
            .First(b => b.Id == dto.BoardId && b.User.Id == dto.UserId);

        List<Game> games = new List<Game>(board.Games);
        games.RemoveAll(g => g.GameStatus == GameStatus.Pending);
        board.Games.Clear();
        board.Games = games;

        await db.SaveChangesAsync();
        return new BaseBoardResponse(board);
    }

    public async Task<BaseBoardResponse> Create(CreateBoardDto dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        // tjekker om det er valide numre som bliver spillet
        if (dto.PlayedNumbers.Any(n => n is < 1 or > 16))
            throw new ValidationException("All numbers must be between 1 and 16.");
        
        var id = Guid.NewGuid().ToString();
        
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId)
                   ?? throw new KeyNotFoundException("User not found");
        if (!user.isActive) throw new ValidationException("User is not active, therefore the user cannot buy a board.");
        var games = await db.Games
                // TODO : tilføj så man ikke kan købe på en søndag eller lørdag alt efter hvilken dag de trækker
            .Where(g => g.GameStatus != GameStatus.Finished && g.StartDate.Date.AddDays(7) >= DateTime.UtcNow.Date)
            .OrderBy(g => g.StartDate)
            .Take(dto.Weeks)
            .ToListAsync();

        if (!games.Any())
        {
            throw new InvalidOperationException("No upcoming games available for the requested period");
        }

        var board = new Board
        {
            Id = id,
            User = user,
            Games = games,
            PlayedNumbers = dto.PlayedNumbers.OrderBy(n => n).ToList(),
            StartDate = DateTime.UtcNow,
        };

        db.Boards.Add(board);
        await db.SaveChangesAsync();
        return new BaseBoardResponse(board);
    }
}