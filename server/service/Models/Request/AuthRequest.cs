using System.ComponentModel.DataAnnotations;

namespace service.Models.Request;

public record RegisterRequest
{
    public RegisterRequest(string Email, string FullName, string Password, string phoneNumber)
    {
        this.Email = Email;
        this.FullName = FullName;
        this.Password = Password;
        this.PhoneNumber = phoneNumber;
    }
    [Required] [EmailAddress] public string Email { get; set; } = null!;
    [Required] [MinLength(6)] public string Password { get; set; } = null!;

    [Required] [MinLength(5)] public string FullName { get; set; } = null!;
    
    [Required] 
    [StringLength(8, MinimumLength = 8)]
    [RegularExpression(@"^\d{8}$", ErrorMessage = "Danish phone numbers must be exactly 8 digits.")]
    public string PhoneNumber { get; set; } = null!;
}

public record LoginRequest([Required] string Email, [Required] string Password);

public record UpdateUserStatusDto
{
    [Required] public string Id { get; set; } = null!;
    public bool Status { get; set; } = false;
}