using dataaccess;
using DataAccess.Entities;
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
            PhoneNumber = "70202020"
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
            PhoneNumber = "70202020"
        };
        normalBurger.PasswordHash = hasher.HashPassword(normalBurger, "Password");

        ctx.Users.Add(adminBruger);
        ctx.Users.Add(normalBurger);
        await ctx.SaveChangesAsync();
    }
}