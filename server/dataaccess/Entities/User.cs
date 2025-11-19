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

    public bool EmailConfirmed { get; set; } = true;

    [JsonIgnore]
    public string PasswordHash { get; set; } = null!;

    public Role Role { get; set; } = Role.Bruger;
    
    public DateTime? Created { get; set; }
}