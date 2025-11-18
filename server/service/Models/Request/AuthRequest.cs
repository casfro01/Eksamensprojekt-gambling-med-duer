using System.ComponentModel.DataAnnotations;

namespace service.Models.Request;

public record RegisterRequest
{
    public RegisterRequest(string Email, string FullName, string Password)
    {
        this.Email = Email;
        this.FullName = FullName;
        this.Password = Password;
    }
    [Required] [EmailAddress] public string Email { get; set; } = null!;
    [MinLength(6)] public string Password { get; set; } = null!;

    [Required] [MinLength(5)] public string FullName { get; set; } = null!;
}

public record LoginRequest([Required] string Email, [Required] string Password);