using api;
using api.Seeder;
using dataaccess;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Testcontainers.PostgreSql;

namespace test;

public class Startup
{
    public static void ConfigureServices(IServiceCollection services)
    {
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development");
        Program.ConfigureServices(services, WebApplication.CreateBuilder());
        services.RemoveAll(typeof(MyDbContext));
        
        services.AddScoped<MyDbContext>(factory =>
        {
            var postgreSqlContainer = new PostgreSqlBuilder().Build();
            postgreSqlContainer.StartAsync().GetAwaiter().GetResult();
            var connectionString = postgreSqlContainer.GetConnectionString();
            var options = new DbContextOptionsBuilder<MyDbContext>()
                .UseNpgsql(connectionString)
                .Options;
            
            var ctx = new MyDbContext(options);
            ctx.Database.EnsureCreated();
            return ctx;
        });
        services.AddScoped<ISeeder, BogusSeed>();
    }
}