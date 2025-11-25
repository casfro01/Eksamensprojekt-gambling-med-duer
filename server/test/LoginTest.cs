using api.Seeder;
using dataaccess;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace test;

public class LoginTest(MyDbContext ctx, IAuthService authService, ISeeder seeder)
{
    [Fact]
    public async Task TestLogin_ValidLoginDetails()
    {
        await seeder.Seed();
        var user = ctx.Users.First(u => true);
        // alle brugerens password er password i test dataet - så man nemt kan teste hver bruger
        LoginRequest req =  new LoginRequest(Email: user.Email, Password:"Password");
        AuthUserInfo loginResponse = authService.Authenticate(req);
        
        Assert.Equal(loginResponse.Id, user.Id);
        Assert.Equal(loginResponse.FullName, user.FullName);
        Assert.Equal(loginResponse.Email, user.Email);
        Assert.Equal(loginResponse.Role, user.Role.ToString());
    }

    [Fact]
    public async Task TestLogin_InvalidLoginDetails()
    {
        LoginRequest req = new LoginRequest(Email: "This@lokks.right", Password: "Password");
        Assert.ThrowsAny<Exception>(() => authService.Authenticate(req));
    }
    
    [Fact]
    public async Task TestLogin_InvalidLoginDetails_InvalidPassword()
    {
        await seeder.Seed();
        var user = ctx.Users.First(u => true);
        LoginRequest req = new LoginRequest(Email: user.Email, Password: "NOT_The_Right_Password");
        Assert.ThrowsAny<Exception>(() => authService.Authenticate(req));
    }
}