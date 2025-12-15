using System.ComponentModel.DataAnnotations;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using Microsoft.AspNetCore.Identity;
using service.Abstractions;
using service.Models.Request;

namespace test;

public class UpdateUserInformationTest(MyDbContext ctx, IPasswordHasher<User> hasher, IAuthService service)
{
    [Theory]
    [InlineData("John Doe", "12345678", "john.doe@example.com")]
    [InlineData("Anna Smith", "87654321", "anna.smith@test.dk")]
    [InlineData("Michael Brown", "11223344", "michael.brown@company.com")]
    [InlineData("Sarah Connor", "99887766", "sarah.connor@future.net")]
    [InlineData("Peter Jensen", "44556677", "peter.jensen@mail.dk")]
    [InlineData("Louise Hansen", "55667788", "louise.hansen@domain.org")]
    [InlineData("Anders Nielsen", "66778899", "anders.nielsen@sample.io")]
    public async Task UpdateUserInformation_name_phone_email_NoErrors(string newName, string newPhone, string newEmail)
    {
        var userId = Guid.NewGuid().ToString();
        var User = new User
        {
            Id = userId,
            FullName = "John Doe",
            Email = "John@Doe.dong",
            isActive = true,
            Role = Role.Bruger,
            PhoneNumber = "70202020"
        };
        User.PasswordHash = hasher.HashPassword(User, "Password");
        ctx.Users.Add(User);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        UpdateUserDto dto = new UpdateUserDto
        {
            Id = userId,
            FullName = newName,
            Email = newEmail,
            PhoneNumber = newPhone
        };
        
        var result = await service.UpdateContactInformation(dto);
        
        Assert.Equal(result.Id, userId);
        Assert.Equal(result.FullName, newName);
        Assert.Equal(result.Email, newEmail);
        Assert.Equal(result.phoneNumber, newPhone);
        
        Assert.Equal(result.Id, User.Id);
        Assert.Equal(result.FullName, User.FullName);
        Assert.Equal(result.Email, User.Email);
        Assert.Equal(result.phoneNumber, User.PhoneNumber);
    }
    
    
    [Theory]
    [InlineData("John", "12345678", "john.doe@example.com")]    // FullName too short (<5)
    [InlineData("", "12345678", "john.doe@example.com")]        // FullName empty
    [InlineData("John Doe", "1234567", "john.doe@example.com")] // Phone too short (7 digits)
    [InlineData("John Doe", "123456789","john.doe@example.com")] // Phone too long (9 digits)
    [InlineData("John Doe", "1234abcd", "john.doe@example.com")] // Phone not numeric
    [InlineData("John Doe", "abcdefgh", "john.doe@example.com")] // Phone letters only
    [InlineData("John Doe", "1234 678", "john.doe@example.com")] // Phone with space
    [InlineData("John Doe", "12345678", "john.doe")]             // Invalid email
    [InlineData("John Doe", "12345678", "john@.com")]            // Invalid email
    [InlineData("John Doe", "12345678", "john.com")]             // Invalid email
    [InlineData("John Doe", "12345678", "")]                     // Email empty
    [InlineData("Anna", "1234567", "invalid-email")]             // Multiple violations
    [InlineData("        ", "70202020", "john.doe@example.com")] // name with just spaces - passes the min length
    [InlineData("John Doe", "        ", "john.doe@example.com")]
    [InlineData("John Doe", "70202020", "                  ")]
    public async Task UpdateUserInformation_name_phone_email_FailValidationExceptions(string newName, string newPhone, string newEmail)
    {
        var userId = Guid.NewGuid().ToString();
        var User = new User
        {
            Id = userId,
            FullName = "John Doe",
            Email = "John@Doe.dong",
            isActive = true,
            Role = Role.Bruger,
            PhoneNumber = "70202020"
        };
        User.PasswordHash = hasher.HashPassword(User, "Password");
        ctx.Users.Add(User);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        UpdateUserDto dto = new UpdateUserDto
        {
            Id = userId,
            FullName = newName,
            Email = newEmail,
            PhoneNumber = newPhone
        };

        await Assert.ThrowsAnyAsync<ValidationException>(async () => await service.UpdateContactInformation(dto));

    }
    
    [Theory]
    [InlineData("New Password")]
    public async Task UpdateUserInformation_password_NoErrors(string newPassword)
    {
        var userId = Guid.NewGuid().ToString();
        var User = new User
        {
            Id = userId,
            FullName = "John Doe",
            Email = "John@Doe.dong",
            isActive = true,
            Role = Role.Bruger,
            PhoneNumber = "70202020"
        };
        User.PasswordHash = hasher.HashPassword(User, "Password");
        ctx.Users.Add(User);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        var dto = new ChangePasswordRequest
        {
            NewPassword = newPassword,
            PreviousPassword = "Password",
            userID = userId

        };
        var result = await service.ChangePassword(dto);
        
        // at det lykkes
        Assert.True(result);
        
        // at passwordet ikke er det samme
        Assert.Equal(PasswordVerificationResult.Failed, hasher.VerifyHashedPassword(User, User.PasswordHash, "Password"));
    }
    
    
    [Theory]
    [InlineData("oldpass",   null)]        // NewPassword is null
    [InlineData("",          "newpass")]   // PreviousPassword empty
    [InlineData("oldpass",   "")]          // NewPassword empty
    [InlineData("123",       "newpass")]   // PreviousPassword too short
    [InlineData("oldpass",   "123")]       // NewPassword too short
    [InlineData("     ",     "newpass")]   // PreviousPassword whitespace (passes Required, but < 6 non-useful chars)
    [InlineData("oldpass",   "     ")]     // NewPassword whitespace
    [InlineData("password123", "password123")] // Same password
    [InlineData("abcdef",      "abcdef")]      // Same, minimum length
    [InlineData("WrongPass123", "           ")] // white space = no go
    public async Task UpdateUserInformation_password_FailWithValidationException(string originalPassword, string newPassword)
    {
        var userId = Guid.NewGuid().ToString();
        var User = new User
        {
            Id = userId,
            FullName = "John Doe",
            Email = "John@Doe.dong",
            isActive = true,
            Role = Role.Bruger,
            PhoneNumber = "70202020"
        };
        User.PasswordHash = hasher.HashPassword(User, originalPassword);
        ctx.Users.Add(User);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        
        var dto = new ChangePasswordRequest
        {
            NewPassword = newPassword,
            PreviousPassword = originalPassword,
            userID = userId

        };
        try
        {
            var res = await service.ChangePassword(dto);
            Assert.False(res);
        }
        catch (ValidationException ex)
        {
            Assert.NotNull(ex);
        }
        catch (ArgumentNullException ex)
        {
            Assert.NotNull(ex);
        }
        // andre u-forventede fejl
        catch (Exception anotherFail)
        {
            Assert.Fail();
        }
        
    }
    
    
    [Fact]
    public async Task UpdateUserInformation_password_WrongTypedInPassword()
    {
        var userId = Guid.NewGuid().ToString();
        var User = new User
        {
            Id = userId,
            FullName = "John Doe",
            Email = "John@Doe.dong",
            isActive = true,
            Role = Role.Bruger,
            PhoneNumber = "70202020"
        };
        User.PasswordHash = hasher.HashPassword(User, "Password");
        ctx.Users.Add(User);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        
        var dto = new ChangePasswordRequest
        {
            NewPassword = "This is a new password",
            PreviousPassword = "This was not the original password",
            userID = userId

        };

        await Assert.ThrowsAnyAsync<ValidationException>(async () => await service.ChangePassword(dto));
    }
}