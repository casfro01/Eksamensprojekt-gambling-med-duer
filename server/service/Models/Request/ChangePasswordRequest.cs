using System.ComponentModel.DataAnnotations;

namespace service.Models.Request;

public class ChangePasswordRequest
{
    [Required] public string userID { get; set; } = null!;
    [Required] [MinLength(6)] public string PreviousPassword { get; set; } = null!;
    [Required] 
    [MinLength(6)] 
    [RegularExpression(@".*\S.*", ErrorMessage = "Password cannot be whitespace.")] 
    public string NewPassword { get; set; } = null!;
}