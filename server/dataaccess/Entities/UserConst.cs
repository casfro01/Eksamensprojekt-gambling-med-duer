using dataaccess.Enums;

namespace DataAccess.Entities;

public partial class User
{
    public User(string id, string fullName, string email, bool isActive, string passwordHash, Role role, string phoneNumber)
    {
        Id = id;
        FullName  = fullName;
        Email = email;
        this.isActive = isActive;
        PasswordHash = passwordHash;
        Role = role;
        PhoneNumber = phoneNumber;
        
    }
    
    public User(){}
}