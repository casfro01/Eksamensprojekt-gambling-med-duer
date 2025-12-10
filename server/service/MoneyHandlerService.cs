using System.ComponentModel.DataAnnotations;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using service.Abstractions;

namespace service;

public class MoneyHandlerService(MyDbContext ctx) : IMoneyHandler
{
    public bool HasEnoughMoney(string userID, double amount)
    {
        if (string.IsNullOrEmpty(userID)) throw new ValidationException("User ID is required");
        
        var userAmount = ctx.Transactions
            .Where(t => t.User.Id == userID && t.Status == PaymentStatus.Accepted)
            .Sum(t => t.Amount);
        
        return userAmount >= amount;
    }

    public async Task<bool> SubtractMoney(string userID, double amount, bool allowOverdraft)
    {
        if (!allowOverdraft && HasEnoughMoney(userID, amount))
        {
            var user = ctx.Users.First(u => u.Id == userID);
            var subMoney = new Transaction
            {
                Id = Guid.NewGuid().ToString(),
                User = user,
                MobilePayId = "00000000000",
                Amount = -(int)amount,
                Status = PaymentStatus.Accepted,
                Created = DateTime.UtcNow,
            };
            ctx.Transactions.Add(subMoney);
            await ctx.SaveChangesAsync();
            return true;
        }
        else
            return false;
    }

    public Task<bool> AddMoney(string userID, double amount)
    {
        throw new NotImplementedException();
    }

    public double GetBoardPrices(int numberAmount)
    {
        if (numberAmount is > 8 or < 5) throw new ArgumentOutOfRangeException();
        return (int) (0.625 * Math.Pow(2, numberAmount));
    }
}