using dataaccess.Enums;
using Sieve.Attributes;

namespace DataAccess.Entities;

public class Game
{
    public string Id { get; set; } = null!;
    
    [Sieve(CanFilter = true, CanSort = true)]
    public DateTime StartDate { get; set; } = DateTime.MinValue;
    
    public virtual ICollection<Board> Boards { get; set; } = new List<Board>();

    [Sieve(CanFilter = true, CanSort = true)]
    public GameStatus GameStatus { get; set; } = GameStatus.Pending;

    public ICollection<int> WinningNumbers { get; set; } = new List<int>();
}