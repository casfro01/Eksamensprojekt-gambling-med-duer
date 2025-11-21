using System.ComponentModel.DataAnnotations;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using Microsoft.EntityFrameworkCore;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;
using Sieve.Models;
using Sieve.Services;

namespace service;

public class TransactionService(MyDbContext ctx, ISieveProcessor processor) : IServiceWithSieve<BaseTransactionResponse, CreateTransactionDto, UpdateTransactionDto>
{
    public async Task<List<BaseTransactionResponse>> Get(SieveModel model)
    {
        IQueryable<Transaction> query = ctx.Transactions;
        query = processor.Apply(model, query);
        return (from transaction in await query.ToListAsync() select new BaseTransactionResponse(transaction)).ToList();
    }

    public async Task<BaseTransactionResponse> Create(CreateTransactionDto request)
    {
        Validator.ValidateObject(request, new ValidationContext(request), true);
        
        User user = ctx.Users.First(u => u.Email == request.Email);

        Transaction trans = new Transaction
        {
            Id = Guid.NewGuid().ToString(),
            Created = DateTime.UtcNow,
            User = user,
            Amount = request.Amount,
            MobilePayId = request.MobilePayId,
            Status = PaymentStatus.Pending,
        };
        
        ctx.Transactions.Add(trans);
        await ctx.SaveChangesAsync();
        
        return new BaseTransactionResponse(trans);
    }

    public async Task<BaseTransactionResponse> Update(UpdateTransactionDto request)
    {
        Validator.ValidateObject(request, new ValidationContext(request), true);
        
        Transaction trans = ctx.Transactions.First(t => t.Id == request.Id);
        trans.Status = request.PaymentStatus; 
        await ctx.SaveChangesAsync(); 
        return new BaseTransactionResponse(trans);
    }

    public Task<BaseTransactionResponse> Delete(string id)
    {
        throw new NotImplementedException();
    }
}