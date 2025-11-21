using DataAccess.Entities;

namespace service.Models.Responses;

public sealed record BaseGameResponse
{
    public BaseGameResponse(Game game)
    {
        Id = game.Id;
        WinningBoardIds = game.WinningBoards.Select(b => b.Id).ToList();
    }

    public string Id { get; set; } = null!;
    public IReadOnlyList<string> WinningBoardIds { get; set; } = new List<string>();
}