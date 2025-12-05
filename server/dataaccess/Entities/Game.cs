namespace DataAccess.Entities;

public class Game
{
    public string Id { get; set; } = null!;
    
    public DateTime StartDate { get; set; } = DateTime.MinValue;
    
    public ICollection<Board> WinningBoards { get; set; } = new List<Board>();
    
    public bool IsFinished { get; set; } = false;

    public ICollection<int> WinningNumbers { get; set; } = new List<int>();
}