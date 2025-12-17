using DataAccess.Entities;
using dataaccess.Enums;

namespace service.Models.Responses;

public record BaseGameResponse
{
    public BaseGameResponse(Game game)
    {
        Id = game.Id;
        StartTime = game.StartDate;
        GameStatus = game.GameStatus;
        WinningNumbers = game.WinningNumbers;
    }

    public string Id { get; set; } = null!;
    
    public DateTime StartTime { get; set; } = DateTime.MinValue;
    
    public GameStatus GameStatus { get; set; }
    
    public ICollection<int> WinningNumbers { get; set; }
}