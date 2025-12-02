
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
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
    public async Task<GetAllUsersResponse> GetAllUsers([FromBody]SieveModel request)
    {
        return await service.GetAllUsersResponse(request);
    }

    [HttpPut]
    [Route(nameof(SetUserStatus))]
    [Authorize(Roles = "Administrator")]
    public async Task<UserData> SetUserStatus([FromBody]UpdateUserStatusDto dto)
    {
        return await service.SetUserStatus(dto);
    }

    [HttpPut]
    [Route(nameof(UpdateUserInformation))]
    [Authorize(Roles = "Administrator,Bruger")]
    public async Task<UserData> UpdateUserInformation([FromBody] UpdateUserDto dto)
    {
        var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userID == null) throw new ValidationException("Not a correct user.");
        dto.Id = userID;
        return await service.UpdateContactInformation(dto);
    }
}