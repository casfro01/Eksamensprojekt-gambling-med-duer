using System.ComponentModel.DataAnnotations;
using DataAccess.Entities;

namespace service.Models.Request;

public record CreateBoardDto
{
    
    [Required]
    public string UserId { get; set; } = null!;
    
    [Range(1, 10)]
    public int Weeks { get; set; } = 1;
    
    [MinLength(5)]
    [MaxLength(8)]
    public List<int> PlayedNumbers { get; set; } = new List<int>();
}