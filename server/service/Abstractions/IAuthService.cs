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
}