using dataaccess.Enums;

namespace DataAccess.Entities;

public partial class User
{
    public User(string id, string fullName, string email, bool emailConfirmed, string passwordHash, Role role)
    {
        Id = id;
        FullName  = fullName;
        Email = email;
        EmailConfirmed = emailConfirmed;
        PasswordHash = passwordHash;
        Role = role;
    }
    
    public User(){}
}