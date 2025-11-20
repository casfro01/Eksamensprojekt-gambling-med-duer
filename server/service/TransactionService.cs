using System.ComponentModel.DataAnnotations;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace service;

public class TransactionService(MyDbContext ctx) : IService<BaseTransactionResponse, CreateTransactionDto, UpdateTransactionDTO>
{
    public Task<List<BaseTransactionResponse>> Get()
    {
        throw new NotImplementedException();
    }

    public Task<BaseTransactionResponse> Get(string id)
    {
        throw new NotImplementedException();
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

    public Task<BaseTransactionResponse> Update(UpdateTransactionDTO request)
    {
        throw new NotImplementedException();
    }

    public Task<BaseTransactionResponse> Delete(string id)
    {
        throw new NotImplementedException();
    }
}