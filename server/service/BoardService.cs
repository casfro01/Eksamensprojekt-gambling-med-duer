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

    public Task<BaseBoardResponse> Update(UpdateBoardDto dto)
    {
        throw new NotImplementedException();
    }

    public async Task<BaseBoardResponse> Create(CreateBoardDto dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        var id = Guid.NewGuid().ToString();
        
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId)
                   ?? throw new KeyNotFoundException("User not found");
        if (!user.isActive) throw new ValidationException("User is not active, therefore the user cannot buy a board.");
        var games = await db.Games
            .Where(g => g.GameStatus == GameStatus.Pending && g.StartDate.Date >= DateTime.UtcNow.Date)
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