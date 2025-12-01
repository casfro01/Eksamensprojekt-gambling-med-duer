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
    public string Email { get; set; }
    public string Role { get; set; }
    public int Balance { get; set; }
    public string phoneNumber { get; set; }
    public bool isActive { get; set; }
    public DateTime Created { get; set; }
    public UserData(User user)
    {
        Id = user.Id;
        FullName = user.FullName;
        Email = user.Email;
        Role = user.Role.ToString();
        Balance = user.Transactions.Where(t => t.Status == PaymentStatus.Accepted).Sum(t => t.Amount);
        phoneNumber = user.PhoneNumber;
        isActive = user.isActive;
        Created = user.Created ?? new DateTime(1974, 9, 7);
    }
}