using System.Transactions;
using DataAccess.Entities;
using dataaccess.Enums;

namespace service.Models.Responses;

public record RegisterResponse(string FullName);

public record LoginResponse(string Jwt);

public record AuthUserInfo(string Id, string FullName, string Email, string Role);

public class UserData
{
    public string Id { get; set; }
    public string FullName { get; set; }
    private string Email { get; set; }
    private string Role { get; set; }
    private int Balance { get; set; }
    private string phoneNumber { get; set; }
    private bool isActive { get; set; }
    public UserData(User user)
    {
        Id = user.Id;
        FullName = user.FullName;
        Email = user.Email;
        Role = user.Role.ToString();
        Balance = user.Transactions.Where(t => t.Status == PaymentStatus.Accepted).Sum(t => t.Amount);
        phoneNumber = user.PhoneNumber;
        isActive = user.isActive;
    }
}