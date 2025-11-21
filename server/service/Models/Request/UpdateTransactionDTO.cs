using System.ComponentModel.DataAnnotations;
using dataaccess.Enums;

namespace service.Models.Request;

public class UpdateTransactionDto
{
    [Required] public string Id { get; set; } = null!;
    [Required] public PaymentStatus PaymentStatus { get; set; }
    // skal vi have amount???
    //[Required] [Range(1, int.MaxValue)] public int Amount { get; set; }
    
    
}