using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks.Dataflow;
using Sieve.Attributes;

namespace DataAccess.Entities;

public class Board
{
    public string Id { get; set; } = null!;

    [ForeignKey(nameof(User))]
    [Sieve(CanFilter = true, CanSort = true)]
    public string UserId { get; set; }
    public User User { get; set; } = null!;
    
    public virtual ICollection<Game> Games  { get; set; } = new List<Game>();
    
    public List<int> PlayedNumbers { get; set; } = new List<int>();
    
    [Sieve(CanFilter = true, CanSort = true)]
    public DateTime StartDate { get; set; }

}