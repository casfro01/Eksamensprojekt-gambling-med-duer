using DataAccess.Entities;
using dataaccess.Enums;

namespace service.Models.Responses;

public class BaseTransactionResponse
{
    public string Id { get; set; } = null!;
    public string MobilePayId { get; set; } = null!;
    public int Amount { get; set; } = 0;
    public string Email { get; set; } = null!;
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public DateTime Created { get; set; }

    public BaseTransactionResponse(Transaction transaction)
    {
        Id = transaction.Id;
        MobilePayId = transaction.MobilePayId;
        Amount = transaction.Amount;
        Email = transaction.User.Email;
        Status = transaction.Status;
        Created = transaction.Created;
    }
}