using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using service;
using Sieve.Models;

namespace test;

public class GetGameHistory(MyDbContext ctx, IGameService gameService)
{
    [Fact]
    public async Task GetGameHistoryTest()
    {
        var id1 = Guid.NewGuid().ToString();
        var id2 = Guid.NewGuid().ToString();
        var id3 = Guid.NewGuid().ToString();
        var game1 = new Game
        {
            Id = id1,
            StartDate = DateTime.UtcNow,
            Boards = [],
            GameStatus = GameStatus.Finished,
            WinningNumbers = [1,2,3]
        };
        var game2 = new Game
        {
            Id = id2,
            StartDate = DateTime.UtcNow.Add(TimeSpan.FromDays(-7.0d)),
            Boards = [],
            GameStatus = GameStatus.Finished,
            WinningNumbers = [1,2,3]
        };
        var game3 = new Game
        {
            Id = id3,
            StartDate = DateTime.UtcNow.Add(TimeSpan.FromDays(-14.0d)),
            Boards = [],
            GameStatus = GameStatus.Finished,
            WinningNumbers = [1,2,3]
        };
        ctx.Add(game1);
        ctx.Add(game2);
        ctx.Add(game3);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        var sieve = new SieveModel
        {
            Filters = "gamestatus==0",
            Sorts = "-startDate"
        };
        
        var res = await gameService.Get(sieve);
        
        Assert.Equal(3, res.Count);
        Assert.NotNull(res[0]);
        Assert.NotNull(res[1]);
        Assert.NotNull(res[2]);
        // mere man kan tjekke for? - for man får jo dem ud ig.
    }
}