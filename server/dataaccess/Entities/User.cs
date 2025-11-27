using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using dataaccess.Enums;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Entities;

[Index(nameof(Email), IsUnique = true)]
public partial class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; } = null!;

    public string FullName { get; set; } = null!;
    
    [Required]
    public string Email { get; set; } = null!;

    public bool isActive { get; set; } = false;
    
    public List<Board> Boards { get; set; } = new List<Board>();

    [JsonIgnore]
    public string PasswordHash { get; set; } = null!;

    public Role Role { get; set; } = Role.Bruger;
    
    public DateTime? Created { get; set; }
    
    public string PhoneNumber { get; set; } = null!;
    
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}