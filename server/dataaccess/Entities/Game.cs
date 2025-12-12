using dataaccess.Enums;

namespace DataAccess.Entities;

public class Game
{
    public string Id { get; set; } = null!;
    
    public DateTime StartDate { get; set; } = DateTime.MinValue;
    
    public virtual ICollection<Board> Boards { get; set; } = new List<Board>();

    public GameStatus GameStatus { get; set; } = GameStatus.Pending;

    public ICollection<int> WinningNumbers { get; set; } = new List<int>();
}