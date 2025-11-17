using System.ComponentModel.DataAnnotations;

namespace service.Models.Request;

public record RegisterRequest(
    [Required] [EmailAddress] string Email,
    [Required] [MinLength(3)] string UserName,
    [MinLength(6)] string Password,
    [Required] [MinLength(5)] string FullName
);

public record LoginRequest([Required] string Email, [Required] string Password);