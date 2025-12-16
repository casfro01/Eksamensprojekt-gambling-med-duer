using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using dataaccess.Enums;
using Sieve.Attributes;

namespace DataAccess.Entities;

public class Transaction
{
    [Key]
    [Sieve(CanSort = true)]
    public string Id { get; set; } = null!;

    [Required]
    [Sieve(CanFilter = true, CanSort = true)]
    public User User { get; set; } = null!;
    
    [ForeignKey(nameof(User))]
    [Sieve(CanFilter = true, CanSort = true)]   
    [MaxLength(100)]
    public string UserId { get; set; } = null!;

    [Sieve(CanFilter = true, CanSort = true)]
    [Required] public string MobilePayId { get; set; } = null!;

    [Sieve(CanFilter = true, CanSort = true)]
    [Required] public int Amount { get; set; } = 0;

    [Sieve(CanFilter = true, CanSort = true)]
    [Required] public PaymentStatus Status { get; set; } = PaymentStatus.Rejected;
    
    [Sieve(CanFilter = true, CanSort = true)]
    [Required] public DateTime Created { get; set; }
}