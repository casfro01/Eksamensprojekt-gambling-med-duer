namespace DataAccess.Entities;

public partial class User
{
    public User(string id, string userName, string email, bool emailConfirmed, string passwordHash, string role)
    {
        Id = id;
        UserName  = userName;
        Email = email;
        EmailConfirmed = emailConfirmed;
        PasswordHash = passwordHash;
        Role = role;
    }
}