using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using dataaccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace service;

public class AuthService(MyDbContext dbContext, PasswordHasher<User> passwordHasher) : IAuthService
{
    public AuthUserInfo Authenticate(LoginRequest request)
    {
        throw new NotImplementedException();
    }

    public async Task<AuthUserInfo> Register(RegisterRequest request)
    {
        Validator.ValidateObject(request, new ValidationContext(request), true);
        var user = new User(
            id: Guid.NewGuid().ToString(),
            email: request.Email,
            emailVerified: false,
            created:  DateTime.UtcNow,
            username: request.UserName,
            passwordHash: "",
            role: "bruger"
            );
        user.PasswordHash = passwordHasher.HashPassword(user, request.Password);
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();
        return new AuthUserInfo(user.Id, user.UserName,  user.Role);
    }

    public AuthUserInfo? GetUserInfo(ClaimsPrincipal principal)
    {
        throw new NotImplementedException();
    }
}