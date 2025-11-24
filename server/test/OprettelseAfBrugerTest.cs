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
    [InlineData("JohnD", "john.doe@example.com", "70202020")]
    [InlineData("Jane Smith", "jane.smith@example.com", "91837465")]
    [InlineData("Michael Brown", "michael.brown@example.com", "84739201")]
    [InlineData("Emily Johnson", "emily.johnson@example.com", "63928471")]
    public async Task TestUserCreation_NoErrors(string name, string email, string phonenumber)
    {
        string password = "jensrwetewrtyrewrty";
        RegisterRequest user = new RegisterRequest(Email: email, Password: password, FullName: name, phoneNumber: phonenumber);
        
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
        RegisterRequest req = new RegisterRequest(Email: user.Email, FullName: "JEns Jens Jens", Password: "Password", phoneNumber: "70202020");
        await Assert.ThrowsAnyAsync<ValidationException>(async () => await authService.Register(req));
    }
    
    
    [Theory]
    // Invalid email (fails EmailAddress)
    [InlineData("not-an-email", "John Doe", "abcdef", "70202020")]

    // Missing email (fails Required)
    [InlineData("", "John Doe", "abcdef", "91837465")]

    // Too-short password (fails MinLength 6)
    [InlineData("test@example.com", "John Doe", "123", "84739201")]

    // Missing full name (fails Required)
    [InlineData("test@example.com", "", "abcdef", "63928471")]

    // Too-short full name (fails MinLength 5)
    [InlineData("test@example.com", "Ana", "abcdef", "52649283")]

    // Multiple failures: bad email + short password
    [InlineData("invalid@", "John Doe", "abc", "74839201")]

    // Multiple failures: missing name + short password
    [InlineData("user@mail.com", "", "123", "90283745")]

    // Multiple failures: empty everything
    [InlineData("", "", "", "")]
    
    
    // Phone too short (fails MinLength)
    [InlineData("valid@mail.com", "John Doe", "abcdef", "123")]

    // Phone contains letters (fails Phone)
    [InlineData("valid@mail.com", "John Doe", "abcdef", "abcd1234")]

    // Phone is empty (fails Required)
    [InlineData("valid@mail.com", "John Doe", "abcdef", "")]

    // Phone uses symbols (fails Phone)
    [InlineData("valid@mail.com", "John Doe", "abcdef", "++++----")]

    // Phone too long / wrong format
    [InlineData("valid@mail.com", "John Doe", "abcdef", "123456789012345")]
    public async Task TestUserCreation_WithValidationErrors(string email, string name, string password, string phoneNumber)
    {
        RegisterRequest req = new RegisterRequest(Email: email, FullName: name, Password: password, phoneNumber: phoneNumber);
        await Assert.ThrowsAnyAsync<ValidationException>(async () => await authService.Register(req));
    }
}