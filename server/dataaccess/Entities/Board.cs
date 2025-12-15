using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks.Dataflow;

namespace DataAccess.Entities;

public class Board
{
    public string Id { get; set; } = null!;

    [ForeignKey(nameof(User))] 
    public string UserId { get; set; }
    public User User { get; set; } = null!;
    
    public virtual ICollection<Game> Games  { get; set; } = new List<Game>();
    
    public List<int> PlayedNumbers { get; set; } = new List<int>();
    
    public DateTime StartDate { get; set; }

}