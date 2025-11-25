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
        IQueryable<Transaction> query = ctx.Transactions.Include(t => t.User);
        query = processor.Apply(model, query);
        var res = await query.ToListAsync();
        return (from transaction in res select new BaseTransactionResponse(transaction)).ToList();
    }

    public async Task<BaseTransactionResponse> Create(CreateTransactionDto request)
    {
        Validator.ValidateObject(request, new ValidationContext(request), true);
        if (request.Id != null) throw new ValidationException("Missing id, try again when you get one");
        User user = ctx.Users.First(u => u.Id == request.Id);

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
        
        Transaction trans = ctx.Transactions.Include(t => t.User).First(t => t.Id == request.Id);
        trans.Status = request.PaymentStatus; 
        await ctx.SaveChangesAsync(); 
        return new BaseTransactionResponse(trans);
    }

    public Task<BaseTransactionResponse> Delete(string id)
    {
        throw new NotImplementedException();
    }
}