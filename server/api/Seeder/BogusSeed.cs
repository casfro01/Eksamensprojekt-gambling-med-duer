using System.Security.Cryptography;
using System.Transactions;
using Bogus;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using Microsoft.AspNetCore.Identity;
using Transaction = DataAccess.Entities.Transaction;

namespace api.Seeder;

public class BogusSeed(MyDbContext context, IPasswordHasher<User> passwordHasher) : ISeeder
{
    public async Task Seed()
    {
        await context.Database.EnsureCreatedAsync();
        context.Boards.RemoveRange(context.Boards);
        context.Games.RemoveRange(context.Games);
        context.Users.RemoveRange(context.Users);
        context.Transactions.RemoveRange(context.Transactions);
        await context.SaveChangesAsync();


        var userFaker = new Faker<User>()
            .RuleFor(u => u.Id, f => Guid.NewGuid().ToString())
            .RuleFor(u => u.Role, f => f.PickRandom<Role>())
            .RuleFor(u => u.Email, f => f.Internet.Email())
            .RuleFor(u => u.FullName, f => f.Person.FullName)
            .RuleFor(u => u.Created, f => DateTime.UtcNow)
            .RuleFor(u => u.PhoneNumber, f => f.Phone.PhoneNumber("########"))
            .RuleFor(u => u.isActive, false);

        var users = userFaker.Generate(25);
        foreach (User u in users)
        {
            u.PasswordHash = passwordHasher.HashPassword(u, "Password");
        }
        context.Users.AddRange(users);
        //await context.SaveChangesAsync();

        var startDate = DateTime.UtcNow.AddDays(-30);
        var startDateSunday = startDate.Date.AddDays(-(7 + (startDate.DayOfWeek - DayOfWeek.Sunday)) % 7);
        var gameFaker = new Faker<Game>()
                .RuleFor(g => g.Id, f => Guid.NewGuid().ToString())
                .RuleFor(g => g.StartDate, f => startDateSunday.AddDays(f.IndexFaker * 7))
                .RuleFor(g => g.IsFinished, f => false)
            ;
        
        var games = gameFaker.Generate(25);
        context.Games.AddRange(games);
        //await context.SaveChangesAsync();

        var nums = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 };
        var boardFaker = new Faker<Board>()
            .RuleFor(b => b.Id, f => Guid.NewGuid().ToString())
            .RuleFor(b => b.User, f => f.PickRandom(users))
            .RuleFor(b => b.Games, f => [f.PickRandom(games), f.PickRandom(games), f.PickRandom(games)])
            .RuleFor(b => b.PlayedNumbers, f =>
            [
                f.PickRandom(nums), f.PickRandom(nums), f.PickRandom(nums), f.PickRandom(nums), f.PickRandom(nums)
            ]);
        var boards = boardFaker.Generate(25);

        context.Boards.AddRange(boards);
        //await context.SaveChangesAsync();


        var transactionFaker = new Faker<Transaction>()
            .RuleFor(t => t.Id, f => Guid.NewGuid().ToString())
            .RuleFor(t => t.User, f => f.PickRandom(users))
            .RuleFor(t => t.Amount, f => f.PickRandom(nums))
            .RuleFor(t => t.Created, DateTime.UtcNow)
            .RuleFor(t => t.MobilePayId, f => f.Finance.Account())
            .RuleFor(t => t.Status, f => f.PickRandom<PaymentStatus>());
        var transactions = transactionFaker.Generate(500);
        context.Transactions.AddRange(transactions);
        
        await context.SaveChangesAsync();
        
        context.ChangeTracker.Clear();
    }
}