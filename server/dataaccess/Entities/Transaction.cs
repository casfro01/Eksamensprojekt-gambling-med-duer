using System.ComponentModel.DataAnnotations;
using System.Transactions;
using dataaccess.Enums;

namespace DataAccess.Entities;

public class Transaction
{
    [Key]
    public string Id { get; set; } = null!;

    [Required]
    public User User { get; set; } = null!;

    [Required] public string MobilePayId { get; set; } = null!;

    [Required] public int Amount { get; set; } = 0;

    [Required] public PaymentStatus Status { get; set; } = PaymentStatus.Rejected;
    
    [Required] public DateTime Created { get; set; }
}