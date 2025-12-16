using api.Seeder;
using dataaccess;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;
using Sieve.Models;
using Sieve.Services;

namespace test;

public class FetchAllOrMostTransactions(MyDbContext ctx, ISeeder seeder, IServiceWithSieve<BaseTransactionResponse, CreateTransactionDto, UpdateTransactionDto> service)
{
    [Fact]
    public async Task FetchTransactionsTest()
    {
        await seeder.Seed();

        var sieve = new SieveModel();
        sieve.Page = 1;
        sieve.PageSize = 10;
        var res = await service.Get(sieve);
        
        Assert.Equal(10, res.Count);
        foreach (var t in res)
        {
            Assert.NotNull(t);
            Assert.NotNull(t.Id);
            Assert.NotEqual(0, t.Amount);
        }
    }
}