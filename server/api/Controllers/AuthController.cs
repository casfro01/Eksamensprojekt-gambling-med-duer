
using Microsoft.AspNetCore.Authorization;
using service.Models.Request;
using service.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using service.Abstractions;
using service.Security;
using Sieve.Models;

namespace api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService service, ITokenService tokenService) : ControllerBase
{
    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public async Task<LoginResponse> Login([FromBody]LoginRequest request)
    {
        var userInfo = service.Authenticate(request);
        try
        {
            var token = tokenService.CreateToken(userInfo);
            return new LoginResponse(token);
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    [HttpPost]
    [Route("register")]
    [AllowAnonymous]
    public async Task<RegisterResponse> Register([FromBody] RegisterRequest request)
    {
        var userInfo = await service.Register(request);
        return new RegisterResponse(FullName: userInfo.FullName);
    }

    [HttpPost]
    [Route("logout")]
    public async Task<IResult> Logout()
    {
        throw new NotImplementedException();
    }

    [HttpGet]
    [Route("userinfo")]
    [Authorize(Roles = "Bruger,Administrator")]
    public async Task<UserData?> UserInfo()
    {
        return service.GetUserInfo(User);
    }

    [HttpPost]
    [Route("getUsersByFilter")]
    [Authorize(Roles = "Administrator")]
    public async Task<GetAllUsersResponse> GetAllUsers([FromBody] SieveModel request)
    {
        return await service.GetAllUsersResponse(request);
    }
}