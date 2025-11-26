using System.ComponentModel.DataAnnotations;
using service.Models.Responses;

namespace service.Models.Request;

public class CreateTransactionDto
{
    [Required] [MinLength(4)] public string MobilePayId { get; set; } = null!;
    [Required] [Range(1, Int32.MaxValue)] public int Amount { get; set; }
    [Required] [EmailAddress] public string Email { get; set; } = null!;
    public string? Id { get; set; }
}