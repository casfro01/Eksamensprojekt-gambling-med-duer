using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using dataaccess.Enums;
using Microsoft.EntityFrameworkCore;
using Sieve.Attributes;

namespace DataAccess.Entities;

[Index(nameof(Email), IsUnique = true)]
public partial class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; } = null!;

    [Sieve(CanFilter = true, CanSort = true)]
    public string FullName { get; set; } = null!;
    
    [Sieve(CanFilter = true, CanSort = true)]
    [Required]
    public string Email { get; set; } = null!;

    [Sieve(CanFilter = true, CanSort = true)]
    public bool isActive { get; set; }
    
    public List<Board> Boards { get; set; } = new List<Board>();

    [JsonIgnore]
    public string PasswordHash { get; set; } = null!;

    [Sieve(CanFilter = true, CanSort = true)]
    public Role Role { get; set; } = Role.Bruger;
    
    [Sieve(CanFilter = true, CanSort = true)]
    public DateTime? Created { get; set; }
    
    [Sieve(CanFilter = true, CanSort = true)]
    public string PhoneNumber { get; set; } = null!;
    
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}