using api.Seeder;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using Microsoft.EntityFrameworkCore;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;
using Sieve.Models;

namespace test;

public class TransactionTests(MyDbContext ctx, ISeeder seeder, IServiceWithSieve<BaseTransactionResponse, CreateTransactionDto, UpdateTransactionDto> service)
{
    [Fact]
    public async Task GetPendingTransactions()
    {
        await seeder.Seed();
        IQueryable<Transaction> query = ctx.Transactions;
        var list = await query
            .Where(t => t.Status == PaymentStatus.Pending)
            .OrderBy(t => t.Id)
            .Skip(10)
            .Take(10)
            .ToListAsync(cancellationToken: TestContext.Current.CancellationToken);
        var sievemodel = new SieveModel();
        sievemodel.Filters = "Status==0";
        sievemodel.Sorts = "Id";
        sievemodel.Page = 2;
        sievemodel.PageSize = 10;
        var res = await service.Get(sievemodel);
        
        Assert.Equal(list.Count, res.Count);
        for (int i = 0; i < list.Count; i++)
        {
            Assert.Equal(list[i].Id, res[i].Id);
        }
    }

    public async Task GetPendingTransactions_Not()
    {
        throw new NotImplementedException();
    }


    [Fact]
    public async Task UpdatePendingTransactions_WithNoValidtionErrors()
    {
        await seeder.Seed();
        var trans = ctx.Transactions.First(t => t.Status == PaymentStatus.Pending);
        Assert.Equal(PaymentStatus.Pending, trans.Status);
        UpdateTransactionDto dto = new UpdateTransactionDto()
        {
            Id = trans.Id,
            PaymentStatus = PaymentStatus.Accepted,
        };
        await service.Update(dto);
        var newTrans = ctx.Transactions.First(t => t.Id == trans.Id);
        Assert.Equal(PaymentStatus.Accepted, newTrans.Status);
    }
}