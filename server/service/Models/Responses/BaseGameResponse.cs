using DataAccess.Entities;

namespace service.Models.Responses;

public sealed record BaseGameResponse
{
    public BaseGameResponse(Game game)
    {
        Id = game.Id;
        StartTime = game.StartDate;
        WinningBoardIds = game.WinningBoards.Select(b => b.Id).ToList();
    }

    public string Id { get; set; } = null!;
    
    public DateTime StartTime { get; set; } = DateTime.MinValue;
    public IReadOnlyList<string> WinningBoardIds { get; set; } = new List<string>();
}