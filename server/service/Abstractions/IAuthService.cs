using System.Security.Claims;
using service.Models.Request;
using service.Models.Responses;
using Sieve.Models;

namespace service.Abstractions;

public interface IAuthService
{
    AuthUserInfo Authenticate(LoginRequest request);
    Task<AuthUserInfo> Register(RegisterRequest request);
    
    UserData? GetUserInfo(ClaimsPrincipal principal);
    Task<GetAllUsersResponse> GetAllUsersResponse(SieveModel request);
    Task<UserData> SetUserStatus(UpdateUserStatusDto dto);
    Task<UserData> UpdateContactInformation(UpdateUserDto dto);
    Task<bool> ChangePassword(ChangePasswordRequest dto);
}