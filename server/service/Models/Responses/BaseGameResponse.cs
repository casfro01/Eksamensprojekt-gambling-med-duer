using DataAccess.Entities;

namespace service.Models.Responses;

public sealed record BaseGameResponse
{
    public BaseGameResponse(Game game)
    {
        Id = game.Id;
        StartTime = game.StartDate;
    }

    public string Id { get; set; } = null!;
    
    public DateTime StartTime { get; set; } = DateTime.MinValue;
}