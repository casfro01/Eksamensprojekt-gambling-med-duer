namespace DataAccess.Entities;

public class Game
{
    public string Id { get; set; } = null!;
    
    public List<Board> WinnningBoards { get; set; } = new List<Board>();
}