using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
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

        return passwordResult ? new AuthUserInfo(getUser.Id, getUser.FullName, getUser.Email, getUser.Role.ToString()) : throw new Exception("Invalid credentials");
    }

    public async Task<AuthUserInfo> Register(RegisterRequest request)
    {
        Validator.ValidateObject(request, new ValidationContext(request), true);
        
        if (dbContext.Users.Any(u => u.Email == request.Email)) throw new ValidationException("Email already exists");
        
        var user = new User(
            id: Guid.NewGuid().ToString(),
            email: request.Email,
            isActive: false,
            fullName: request.FullName,
            passwordHash: "",
            role: Role.Bruger,
            phoneNumber: request.PhoneNumber
            );
        user.PasswordHash = passwordHasher.HashPassword(user, request.Password); // her?
        user.Created = DateTime.UtcNow;
        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();
        return new AuthUserInfo(user.Id, user.FullName, user.Email, user.Role.ToString());
    }

    public UserData? GetUserInfo(ClaimsPrincipal principal)
    {
        //var role = principal.FindFirstValue(ClaimTypes.Role);
        var userID = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = dbContext.Users.First(u => u.Id == userID);
        var balance = dbContext.Transactions.Where(t => t.User.Id == userID).Sum(t => t.Amount);
        return new UserData(user.Id, user.FullName, user.Email, user.Role.ToString(), balance, user.PhoneNumber, user.isActive);
    }
}