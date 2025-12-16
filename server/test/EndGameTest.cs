using System.ComponentModel.DataAnnotations;
using api.Seeder;
using dataaccess;
using dataaccess.Enums;
using service;

namespace test;

public class EndGameTest(MyDbContext ctx, ISeeder seeder, IGameService service)
{
    [Theory]
    [InlineData(new[] {1,2,3})]
    [InlineData(new[] {15,16,14})]
    [InlineData(new[] {10,1,2})]
    public async Task EndGameTest_WithNoErrors(int[] numbers)
    {
        await seeder.Seed();
        WinningNumbers dto = new WinningNumbers
        {
            numbers = new HashSet<int>(numbers),
        };
        var res = await service.SetWinningNumbers(dto);

        Assert.NotNull(res);
        Assert.Equal(GameStatus.Finished, res.GameStatus);
        Assert.Equal(3, res.WinningNumbers.Count);
    }
    
    
    
    [Theory]
    [InlineData(new[] {1})]
    [InlineData(new[] {15,16})]
    [InlineData(new[] {10,1,2,4})]
    [InlineData(new[] {10,1,2,4,16})]
    public async Task EndGameTest_WithErrors(int[] numbers)
    {
        await seeder.Seed();
        WinningNumbers dto = new WinningNumbers
        {
            numbers = new HashSet<int>(numbers),
        };

        await Assert.ThrowsAnyAsync<ValidationException>(async () => await service.SetWinningNumbers(dto));
    }
    
    [Fact]
    public async Task DoesAGameStartAfterOneHasFinished()
    {
        await seeder.Seed();
        var amount = ctx.Games.Count();
        Assert.True(amount > 0);
        
        var currentGame = ctx.Games.First(g => g.GameStatus == GameStatus.InProgress);
        WinningNumbers dto = new WinningNumbers
        {
            numbers = new HashSet<int>([1,2,3]),
        };
        var res = await service.SetWinningNumbers(dto);
        var theNewGame = ctx.Games.First(g => g.GameStatus == GameStatus.InProgress);
        Assert.NotNull(res);
        Assert.NotNull(currentGame);
        Assert.NotNull(theNewGame);
        Assert.NotEqual(currentGame.Id, theNewGame.Id);
        Assert.Equal(GameStatus.Finished, res.GameStatus);
        Assert.Equal(3, res.WinningNumbers.Count);
        Assert.Equal(GameStatus.Finished, currentGame.GameStatus);
        Assert.Equal(GameStatus.InProgress, theNewGame.GameStatus);
    }
}