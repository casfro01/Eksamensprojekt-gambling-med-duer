using dataaccess;
using DataAccess.Entities;
using Bogus;
using dataaccess.Enums;
using Microsoft.AspNetCore.Identity;

namespace api.Seeder;

public class SimpleSeeder(MyDbContext ctx, IPasswordHasher<User> hasher) : ISeeder
{
    public async Task Seed()
    {
        await ctx.Database.EnsureCreatedAsync();
        ctx.Boards.RemoveRange(ctx.Boards);
        ctx.Games.RemoveRange(ctx.Games);
        ctx.Users.RemoveRange(ctx.Users);
        ctx.Transactions.RemoveRange(ctx.Transactions);
        await ctx.SaveChangesAsync();
        User adminBruger = new User
        {
            Id = Guid.NewGuid().ToString(),
            FullName = "Admin Bruger",
            Email = "Admin@gmail.com",
            isActive = true,
            PasswordHash = "",
            Role = Role.Administrator,
            PhoneNumber = "70202020",
            Created = DateTime.UtcNow
        };
        adminBruger.PasswordHash = hasher.HashPassword(adminBruger, "Password");

        User normalBurger = new User
        {
            Id = Guid.NewGuid().ToString(),
            FullName = "Normal Bruger",
            Email = "Bruger@gmail.com",
            isActive = true,
            PasswordHash = "",
            Role = Role.Bruger,
            PhoneNumber = "70202020",
            Created = DateTime.UtcNow
        };
        normalBurger.PasswordHash = hasher.HashPassword(normalBurger, "Password");

        ctx.Users.Add(adminBruger);
        ctx.Users.Add(normalBurger);
        
        var nums = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 };
        var boardFaker = new Faker<Board>()
                .RuleFor(b => b.Id, f => Guid.NewGuid().ToString())
                .RuleFor(b => b.UserId, f => f.PickRandom(new[] { adminBruger.Id, normalBurger.Id })) 
                .RuleFor(b => b.StartDate, f => DateTime.UtcNow)
                .RuleFor(b => b.PlayedNumbers, f =>
                [
                    f.PickRandom(nums), f.PickRandom(nums), f.PickRandom(nums), f.PickRandom(nums), f.PickRandom(nums)
                ]);            ;

        var boards = boardFaker.Generate(5); 
        ctx.Boards.AddRange(boards);
        
        var startDate = DateTime.UtcNow.AddDays(-30);
        var startDateSunday = startDate.Date.AddDays(-(7 + (startDate.DayOfWeek - DayOfWeek.Sunday)) % 7);
        var gameFaker = new Faker<Game>()
                .RuleFor(g => g.Id, f => Guid.NewGuid().ToString())
                .RuleFor(g => g.StartDate, f => startDateSunday.AddDays(f.IndexFaker * 7))
                .RuleFor(g => g.GameStatus, f =>
                {
                    DateTime today = DateTime.UtcNow.Date;

                    int daysSinceSunday = (int)today.DayOfWeek;
                    DateTime currentWeekSunday = today.AddDays(-daysSinceSunday);

                    DateTime gameWeekSunday = startDateSunday.AddDays(f.IndexFaker * 7).Date;

                    if (currentWeekSunday == gameWeekSunday)
                        return GameStatus.InProgress;
                    
                    if (today > gameWeekSunday)
                        return GameStatus.Finished;

                    return GameStatus.Pending;
                })
            ;
        
        var games = gameFaker.Generate(25);
        ctx.Games.AddRange(games);

        var random = new Random();
        foreach (var game in games)
        {
            var board = boards[random.Next(boards.Count)];
            board.Games.Add(game); // Add game to board
        }
        
        await ctx.SaveChangesAsync();
    }
}