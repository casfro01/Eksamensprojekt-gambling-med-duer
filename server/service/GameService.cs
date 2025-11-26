using dataaccess;
using Microsoft.EntityFrameworkCore;
using service.Abstractions;
using service.Models.Responses;

namespace service;

public interface IGameService
{
    Task<List<BaseGameResponse>> Get();
    Task<BaseGameResponse> Get(string id);
}

public class GameService(MyDbContext db) : IGameService
{
    public Task<List<BaseGameResponse>> Get()
    {
        return db.Games
            .Include(g => g.WinningBoards)
            .Select(g => new BaseGameResponse(g)).ToListAsync();
    }

    public async Task<BaseGameResponse> Get(string id)
    {
        var game = await db.Games.FirstOrDefaultAsync(g => g.Id == id);
        return game == null ? throw new KeyNotFoundException("Game not found") : new BaseGameResponse(game);
    }
}