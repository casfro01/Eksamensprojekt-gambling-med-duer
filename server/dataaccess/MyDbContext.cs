using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace dataaccess;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }
    
    public virtual DbSet<User> Users { get; set; }
    
}