using System.ComponentModel.DataAnnotations;
using DataAccess.Entities;
using service.Abstractions;

namespace service.Models.Responses;

public record ExtendedGameResponse :  BaseGameResponse
{
    public ExtendedGameResponse(Game game, int totalRevenue, int totalBoardsOnGame, int totalWinning) : base(game)
    {
        TotalRevenue = totalRevenue;
        TotalBoardsOnGame = totalBoardsOnGame;
        TotalWinningBoards = totalWinning;
        WeekNumber = DateHandler.WeekNumber(game.StartDate.Year, game.StartDate.Month, game.StartDate.Day);
    }

    [Required] public int TotalRevenue { get; set; }
    [Required] public int TotalBoardsOnGame { get; set; }
    [Required] public int TotalWinningBoards { get; set; }
    
    [Required] public int WeekNumber { get; set; }
}