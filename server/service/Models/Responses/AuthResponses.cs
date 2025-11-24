using dataaccess.Enums;

namespace service.Models.Responses;

public record RegisterResponse(string FullName);

public record LoginResponse(string Jwt);

public record AuthUserInfo(string Id, string FullName, string Email, string Role);

public record UserData(string Id, string FullName, string Email, string Role, int Balance, string phoneNumber, bool isActive) : AuthUserInfo(Id, FullName, Email, Role);