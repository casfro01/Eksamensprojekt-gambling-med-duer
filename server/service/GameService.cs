using dataaccess;
using Microsoft.EntityFrameworkCore;
using service.Abstractions;
using service.Models.Responses;

namespace service;

public class GameService(MyDbContext db) : IGameService
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
        var activeGame = db.Games
            .Include(g => g.Boards)
            .Include(g => g.WinningNumbers)
            .OrderBy(g => g.StartDate)
            .First(g => !g.IsFinished);
        activeGame.IsFinished = true;
        activeGame.WinningNumbers = winningNumbers.numbers;
        await db.SaveChangesAsync();
        return new BaseGameResponse(activeGame);
    }
}