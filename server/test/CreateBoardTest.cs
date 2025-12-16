using System.ComponentModel.DataAnnotations;
using api.Seeder;
using dataaccess;
using DataAccess.Entities;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace test;

public class CreateBoardTest(MyDbContext ctx, IServiceWithSieve<BaseBoardResponse, CreateBoardDto, UpdateBoardDto> service, ISeeder seeder)
{
    private async Task<User> GetAUser_Active()
    {
        var user = ctx.Users.First(u => true);
        user.isActive = true;
        await ctx.SaveChangesAsync();
        return user;
    }
    private User GetAUser_InActive()
    {
        return ctx.Users.First(u => u.isActive == false);
    }
    
    [Theory]
    [InlineData(1, new[] {1, 2, 3, 4, 5})]
    [InlineData(10, new[] {1, 2, 3, 4, 5, 6, 7, 8})]
    [InlineData(5, new[] {10, 11, 12, 13, 14, 15})]
    public async Task CreateBoard_NoValidationErrors(int weeks, int[] playedNumbers)
    {
        await seeder.Seed();

        User user = await GetAUser_Active();

        CreateBoardDto dto = new CreateBoardDto
        {
            UserId = user.Id,
            Weeks = weeks,
            PlayedNumbers = playedNumbers.ToList(),
        };

        var result = await service.Create(dto);
        
        Assert.NotNull(result);
        Assert.Equal(weeks, result.Games.Count);
        Assert.Equal(playedNumbers.Length, result.PlayedNumbers.Count);
        for (int i = 0; i < playedNumbers.Length; i++)
        {
            Assert.Equal(playedNumbers[i], result.PlayedNumbers[i]);
        }
    }
    
    [Theory]
    [InlineData(1, new[] {1, 2, 3, 4, 5})]
    public async Task CreateBoard_Fail_UserIsInActive(int weeks, int[] playedNumbers)
    {
        await seeder.Seed();

        User user = GetAUser_InActive();

        CreateBoardDto dto = new CreateBoardDto
        {
            UserId = user.Id,
            Weeks = weeks,
            PlayedNumbers = playedNumbers.ToList(),
        };

        await Assert.ThrowsAnyAsync<ValidationException>(async () => await service.Create(dto));
    }
    
    [Theory]
    // Weeks out of range
    [InlineData(0, new int[] {1, 2, 3, 4, 5})] // Weeks < 1
    [InlineData(11, new int[] {1, 2, 3, 4, 5})] // Weeks > 10
    
    // played numbers out of range
    [InlineData(5, new int[] {1, 2, 3, 4})] // MinLength = 5 not met -> PlayedNumbers too short
    [InlineData(5, new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9})] // MaxLength = 8 exceeded -> too long

    // Multiple failures
    [InlineData(0, new int[] {1, 2, 3})] // Weeks < 1 and MinLength not met
    [InlineData(12, new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10})] // Weeks > 10 and MaxLength exceeded
    [InlineData(5, new int[] {10, 20, 30, 40, 50, 60})] // not valid numbers
    public async Task CreateBoard_WithValidationErrors(int weeks, int[] playedNumbers)
    {
        await seeder.Seed();

        User user = await GetAUser_Active();

        CreateBoardDto dto = new CreateBoardDto
        {
            UserId = user.Id,
            Weeks = weeks,
            PlayedNumbers = playedNumbers.ToList(),
        };

        await Assert.ThrowsAnyAsync<ValidationException>(async () => await service.Create(dto));
    }
}