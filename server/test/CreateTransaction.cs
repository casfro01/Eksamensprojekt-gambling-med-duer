using System.ComponentModel.DataAnnotations;
using api.Seeder;
using dataaccess;
using Microsoft.EntityFrameworkCore;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace test;

public class CreateTransaction(MyDbContext ctx, IService<BaseTransactionResponse, CreateTransactionDto, UpdateTransactionDto> service, ISeeder seeder)
{
    [Theory]
    [InlineData("MP01", 50)]
    [InlineData("Pay1234", 199)]
    [InlineData("TestUser", 999)]
    [InlineData("abcd", 1)]
    [InlineData("MobileX", 250)]
    public async Task CreateTransaction_NoErrors(string mobilepayid, int amount)
    {
        await seeder.Seed();
        var user = ctx.Users.First();
        var dto = new CreateTransactionDto
        {
            Amount = amount,
            MobilePayId = mobilepayid,
            Email = user.Email,
        };
        var trans = await service.Create(dto);
        
        var DBtrans = ctx.Transactions
            .Include(u => u.User)
            .First(t => t.User.Id == user.Id);
        
        Assert.Equal(DBtrans.Amount, amount);
        Assert.Equal(DBtrans.MobilePayId, mobilepayid);
        Assert.Equal(DBtrans.User.Email, user.Email);
        Assert.Equal(trans.Amount, amount);
        Assert.Equal(trans.MobilePayId, mobilepayid);
        Assert.Equal(trans.Email, user.Email);
    }
    
    
    [Theory]
    // MobilePayId too short
    [InlineData("A", 50)]
    [InlineData("MP", 50)]
    [InlineData("123", 50)]

// MobilePayId empty or null-equivalent
    [InlineData("", 50)]
    [InlineData("   ", 50)]

// Amount invalid
    [InlineData("MP01", 0)]
    [InlineData("Pay1234", -10)]

// Both invalid
    [InlineData("", 0)]
    [InlineData("A", -1)]
    public async Task CreateTransaction_WithValidationErrors(string mobilepayid, int amount)
    {
        await seeder.Seed();
        var user = ctx.Users.First();
        var dto = new CreateTransactionDto
        {
            Amount = amount,
            MobilePayId = mobilepayid,
            Email = user.Email,
        };
        await Assert.ThrowsAnyAsync<ValidationException>(async () => await service.Create(dto));
    }
    
    [Theory]
    [InlineData("TestUser", 999)]
    public async Task CreateTransaction_WithNonExitingEmail(string mobilepayid, int amount)
    {
        await seeder.Seed();
        string email = "ThisEmailDoesNotExist@lululul.dk";
        var dto = new CreateTransactionDto
        {
            Amount = amount,
            MobilePayId = mobilepayid,
            Email = email,
        };
        await Assert.ThrowsAnyAsync<Exception>(async () => await service.Create(dto));
    }
}