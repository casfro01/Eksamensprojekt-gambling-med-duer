using System.Threading.Tasks.Dataflow;

namespace DataAccess.Entities;

public class Board
{
    public string Id { get; set; } = null!;
    
    public User User { get; set; } = null!;
    
    public virtual ICollection<Game> Games  { get; set; } = new List<Game>();
    
    public List<int> PlayedNumbers { get; set; } = new List<int>();

}