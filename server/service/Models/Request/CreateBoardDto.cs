using DataAccess.Entities;

namespace service.Models.Request;

public record CreateBoardDto
{
    
    public string UserId { get; set; } = null!;
    
    public virtual List<Game> Games  { get; set; } = new List<Game>();
    
    public List<int> PlayedNumbers { get; set; } = new List<int>();
}