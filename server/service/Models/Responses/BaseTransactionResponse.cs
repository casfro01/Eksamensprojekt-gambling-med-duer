using System.ComponentModel.DataAnnotations;
using DataAccess.Entities;
using dataaccess.Enums;

namespace service.Models.Responses;

public class BaseTransactionResponse
{
    [Required] public string Id { get; set; } = null!;
    [Required] public string MobilePayId { get; set; } = null!;
    [Required] public int Amount { get; set; } = 0;
    public UserData User { get; set; } = null!;
    [Required] public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    [Required] public DateTime Created { get; set; }

    public BaseTransactionResponse(Transaction transaction)
    {
        Id = transaction.Id;
        MobilePayId = transaction.MobilePayId;
        Amount = transaction.Amount;
        User = new UserData(transaction.User);
        Status = transaction.Status;
        Created = transaction.Created;
    }
}