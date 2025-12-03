using System.ComponentModel.DataAnnotations;

namespace service.Models.Request;

public class ChangePasswordRequest
{
    [Required] [MinLength(6)] public string PreviousPassword { get; set; } = null!;
    [Required] [MinLength(6)] public string NewPassword { get; set; } = null!;
}