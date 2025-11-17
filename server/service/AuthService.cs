using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using dataaccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Components.Sections;
using Microsoft.AspNetCore.Identity;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace service;

public class AuthService(MyDbContext dbContext, IPasswordHasher<User> passwordHasher) : IAuthService
{
    public AuthUserInfo Authenticate(LoginRequest request)
    {
        var getUser = dbContext.Users.First(u => u.Email == request.Email);
        var result = passwordHasher.VerifyHashedPassword(getUser, getUser.PasswordHash, request.Password);

        var passwordResult = result == PasswordVerificationResult.Success;

        return passwordResult ? new AuthUserInfo(getUser.Id, getUser.Email, getUser.Role) : throw new Exception("Invalid credentials");
    }

    public async Task<AuthUserInfo> Register(RegisterRequest request)
    {
        Validator.ValidateObject(request, new ValidationContext(request), true);
        var user = new User(
            id: Guid.NewGuid().ToString(),
            email: request.Email,
            emailConfirmed: false,
            userName: request.UserName,
            passwordHash: "",
            role: "bruger"
            );
        user.PasswordHash = passwordHasher.HashPassword(user, request.Password); // her?
        user.Created = DateTime.UtcNow;
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();
        return new AuthUserInfo(user.Id, user.UserName,  user.Role);
    }

    public AuthUserInfo? GetUserInfo(ClaimsPrincipal principal)
    {
        throw new NotImplementedException();
    }
}