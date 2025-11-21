using dataaccess.Enums;

namespace service.Models.Responses;

public record RegisterResponse(string FullName);

public record LoginResponse(string Jwt);

public record AuthUserInfo(string Id, string FullName, string Role);