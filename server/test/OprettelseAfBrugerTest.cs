using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using api.Seeder;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using Microsoft.AspNetCore.Identity;
using service.Abstractions;
using service.Models.Request;

namespace test;

public class OprettelseAfBrugerTest(MyDbContext ctx, IAuthService authService, ISeeder seeder)
{
    [Theory]
    [InlineData("JohnD", "john.doe@example.com")]
    [InlineData("Jane Smith", "jane.smith@example.com")]
    [InlineData("Michael Brown", "michael.brown@example.com")]
    [InlineData("Emily Johnson", "emily.johnson@example.com")]
    public async Task TestUserCreation_NoErrors(string name, string email)
    {
        string password = "jensrwetewrtyrewrty";
        RegisterRequest user = new RegisterRequest(Email: email, Password: password, FullName: name);
        
        var res = await authService.Register(user);
        
        Assert.Equal(res.FullName, name);
        Assert.NotEqual(nameof(Role.Administrator), res.Role);
        var first = ctx.Users.First(u => u.Email == email);
        Assert.NotNull(first.PasswordHash);
        Assert.NotEqual(first.PasswordHash, password);
    }
    
    [Fact]
    public async Task TestUserCreation_ErrorWithSameEmail()
    {
        await seeder.Seed();
        var user = ctx.Users.First();
        RegisterRequest req = new RegisterRequest(Email: user.Email, FullName: "JEns Jens Jens", Password: "Password");
        await Assert.ThrowsAnyAsync<ValidationException>(async () => await authService.Register(req));
    }
    
    
    [Theory]
    // Invalid email (fails EmailAddress)
    [InlineData("not-an-email", "John Doe", "abcdef")]

    // Missing email (fails Required)
    [InlineData("", "John Doe", "abcdef")]

    // Too-short password (fails MinLength 6)
    [InlineData("test@example.com", "John Doe", "123")]

    // Missing full name (fails Required)
    [InlineData("test@example.com", "", "abcdef")]

    // Too-short full name (fails MinLength 5)
    [InlineData("test@example.com", "Ana", "abcdef")]

    // Multiple failures: bad email + short password
    [InlineData("invalid@", "John Doe", "abc")]

    // Multiple failures: missing name + short password
    [InlineData("user@mail.com", "", "123")]

    // Multiple failures: empty everything
    [InlineData("", "", "")]
    public async Task TestUserCreation_WithValidationErrors(string email, string name, string password)
    {
        RegisterRequest req = new RegisterRequest(Email: email, FullName: name, Password: password);
        await Assert.ThrowsAnyAsync<ValidationException>(async () => await authService.Register(req));
    }
}