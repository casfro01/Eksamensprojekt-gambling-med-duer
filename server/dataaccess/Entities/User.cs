using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using dataaccess.Enums;

namespace DataAccess.Entities;

public partial class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public bool EmailConfirmed { get; set; } = true;
    
    public List<Board> Boards { get; set; } = new List<Board>();

    [JsonIgnore]
    public string PasswordHash { get; set; } = null!;

    public Role Role { get; set; } = Role.Bruger;
    
    public DateTime? Created { get; set; }
}