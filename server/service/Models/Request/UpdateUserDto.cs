using System.ComponentModel.DataAnnotations;

namespace service.Models.Request;

public record UpdateUserDto
{
    [Required] public string Id { get; set; } = null!;
    
    [EmailAddress]
    [RegularExpression(
        @"^[^@\s]+@[^@\s]+\.[^@\s]+$", 
        ErrorMessage = "Domain of email is not valid.")] 
    public string Email { get; set; } = null!;
    
    [MinLength(5)] 
    [RegularExpression(@".*\S.*", ErrorMessage = "Full name cannot be empty or whitespace.")] 
    public string FullName { get; set; } = null!;
    
    
    [StringLength(8, MinimumLength = 8)]
    [RegularExpression(@"^\d{8}$", ErrorMessage = "Danish phone numbers must be exactly 8 digits.")]
    public string PhoneNumber { get; set; } =  null!;
}