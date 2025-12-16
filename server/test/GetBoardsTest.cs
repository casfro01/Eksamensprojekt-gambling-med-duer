using api.Seeder;
using dataaccess;
using DataAccess.Entities;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;
using Sieve.Models;

namespace test;

public class GetBoardsTest(MyDbContext ctx, IServiceWithSieve<BaseBoardResponse, CreateBoardDto, UpdateBoardDto> service, ISeeder seeder)
{
    [Fact]
    public async Task GetUserBoards_NoErrors()
    {
        await seeder.Seed();
        var dinge = ctx.Boards.Where(b => true).ToList();
        ctx.Boards.RemoveRange(dinge);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        Assert.Equal(0, ctx.Boards.Count());
        
        var user1 = ctx.Users.First();
        var user2 = ctx.Users.First(u => u.Id != user1.Id);
        var game = ctx.Games.First();
        var board1 = new Board
        {
            Id = Guid.NewGuid().ToString(),
            UserId = user1.Id,
            User = user1,
            Games = [game],
            PlayedNumbers = [1,2,3,4,5],
            StartDate = DateTime.UtcNow,
        };
        var board2 = new Board
        {
            Id = Guid.NewGuid().ToString(),
            UserId = user1.Id,
            User = user1,
            Games = [game],
            PlayedNumbers = [5,6,7,8,9,10],
            StartDate = DateTime.UtcNow,
        };
        var board3 = new Board
        {
            Id = Guid.NewGuid().ToString(),
            UserId = user2.Id,
            User = user2,
            Games = [game],
            PlayedNumbers = [1,2,16,15,14,3],
            StartDate = DateTime.UtcNow,
        };
        ctx.Boards.Add(board1);
        ctx.Boards.Add(board2);
        ctx.Boards.Add(board3);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        var sieveModel = new SieveModel();
        sieveModel.Filters = "UserId==" + user1.Id;

        var res = await service.Get(sieveModel);

        Assert.NotNull(res);
        Assert.Equal(2, res.Count);
        Assert.NotEqual(res[0], res[1]);
    }
}