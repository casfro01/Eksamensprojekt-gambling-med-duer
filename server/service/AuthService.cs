using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using dataaccess;
using DataAccess.Entities;
using dataaccess.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;
using Sieve.Models;
using Sieve.Services;

namespace service;

public class AuthService(MyDbContext dbContext, IPasswordHasher<User> passwordHasher, ISieveProcessor processor) : IAuthService
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
        var user = dbContext.Users.Include(u => u.Transactions).First(u => u.Id == userID);
        //var balance = dbContext.Transactions.Where(t => t.User.Id == userID).Where(t => t.Status == PaymentStatus.Accepted).Sum(t => t.Amount);
        return new UserData(user);
    }

    public async Task<GetAllUsersResponse> GetAllUsersResponse(SieveModel model)
    {
        int userCount = dbContext.Users.Count(); // flytte til cached value?
        int activeUsers = dbContext.Users.Count(u => u.isActive); // same here?
        IQueryable<User> query = dbContext.Users.Include(u => u.Transactions);
        query = processor.Apply(model, query);
        
        var users = await query.ToListAsync();
        return new GetAllUsersResponse{ ActiveUsers = activeUsers, AllUsers = userCount, PagedUsers = users.Select(u => new UserData(u)).ToList() };
    }

    public async Task<UserData> SetUserStatus(UpdateUserStatusDto dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        var user = dbContext.Users.First(u => u.Id == dto.Id);
        user.isActive = dto.Status;
        await dbContext.SaveChangesAsync();
        return new UserData(user);
    }

    public async Task<UserData> UpdateContactInformation(UpdateUserDto dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        var user = dbContext.Users.First(u => u.Id == dto.Id);
        user.FullName = dto.FullName;
        user.Email = dto.Email;
        user.PhoneNumber = dto.PhoneNumber;
        await dbContext.SaveChangesAsync();
        return new UserData(user);
    }

    public async Task<bool> ChangePassword(ChangePasswordRequest dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        if (dto.NewPassword.Equals(dto.PreviousPassword)) throw new ValidationException("Du kan ikke fucking bruge det samme password som dit fede fucking forrige password, idiot, så lad være med at opdatere dit fucking password.");

        var user = dbContext.Users.First(u => u.Id == dto.userID);
        if (passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.PreviousPassword) == PasswordVerificationResult.Failed) throw new ValidationException("Dit nuværende password er forkert!");
        user.PasswordHash = passwordHasher.HashPassword(user, dto.NewPassword);
        await dbContext.SaveChangesAsync();
        return true;
    }
}