using System.ComponentModel.DataAnnotations;
using api.Seeder;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace test;

public class StopRepeatingBoardTest(MyDbContext ctx, IServiceWithSieve<BaseBoardResponse, CreateBoardDto, UpdateBoardDto> service, ISeeder seeder)
{
    [Fact]
    public async Task StopRepeatingBoard_NoErrors()
    {
        await seeder.Seed();
        var dinge = ctx.Boards.Where(b => true).ToList();
        ctx.Boards.RemoveRange(dinge);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        var user1 = ctx.Users.First();
        var game1 = ctx.Games.First(g => g.GameStatus == GameStatus.InProgress);
        var game2 = ctx.Games.First(g => g.Id != game1.Id && g.GameStatus == GameStatus.Pending);
        var game3 = ctx.Games.First(g => g.Id != game1.Id && g.Id != game2.Id && g.GameStatus == GameStatus.Pending);
        var board1 = new Board
        {
            Id = Guid.NewGuid().ToString(),
            UserId = user1.Id,
            User = user1,
            Games = [game1, game2, game3],
            PlayedNumbers = [1,2,3,4,5],
            StartDate = DateTime.UtcNow,
        };
        ctx.Boards.Add(board1);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        UpdateBoardDto dto = new UpdateBoardDto()
        {
            UserId = board1.UserId,
            BoardId = board1.Id,
        };
        var res = await service.Update(dto);
        Assert.NotNull(res);
        Assert.Equal(res.Id, board1.Id);
        Assert.Single(res.Games);
        Assert.Equal(res.PlayedNumbers, board1.PlayedNumbers);
    }
    
    [Fact]
    public async Task StopRepeatingBoard_WithErrors()
    {
        await seeder.Seed();
        var dinge = ctx.Boards.Where(b => true).ToList();
        ctx.Boards.RemoveRange(dinge);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        var user1 = ctx.Users.First();
        var game1 = ctx.Games.First();
        var game2 = ctx.Games.First(g => g.Id != game1.Id);
        var game3 = ctx.Games.First(g => g.Id != game1.Id && g.Id != game2.Id);
        var board1 = new Board
        {
            Id = Guid.NewGuid().ToString(),
            UserId = user1.Id,
            User = user1,
            Games = [game1, game2, game3],
            PlayedNumbers = [1,2,3,4,5],
            StartDate = DateTime.UtcNow,
        };
        ctx.Boards.Add(board1);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        UpdateBoardDto dto = new UpdateBoardDto()
        {
            UserId = "Not a user lol",
            BoardId = board1.Id,
        };
        
        await Assert.ThrowsAnyAsync<InvalidOperationException>(async () => await service.Update(dto));
    }
}