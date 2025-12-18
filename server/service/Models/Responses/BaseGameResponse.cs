using System.ComponentModel.DataAnnotations;
using DataAccess.Entities;
using dataaccess.Enums;

namespace service.Models.Responses;

public record BaseGameResponse
{
    public BaseGameResponse(Game game)
    {
        Id = game.Id;
        StartDate = game.StartDate;
        GameStatus = game.GameStatus;
        WinningNumbers = game.WinningNumbers;
    }

    [Required] public string Id { get; set; } = null!;
    
    [Required] public DateTime StartDate { get; set; } = DateTime.MinValue;
    
    [Required] public GameStatus GameStatus { get; set; }

    [Required] public ICollection<int> WinningNumbers { get; set; } = new List<int>();
}