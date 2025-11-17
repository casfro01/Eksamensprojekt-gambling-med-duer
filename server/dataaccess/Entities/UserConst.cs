namespace DataAccess.Entities;

public partial class User
{
    public User(string id, string username, string email, bool emailVerified, string passwordHash, string role, DateTime created)
    {
        Id = id;
        UserName  = username;
        Email = email;
        EmailConfirmed = emailVerified;
        PasswordHash = passwordHash;
        Role = role;
        Created = created;
    }
}