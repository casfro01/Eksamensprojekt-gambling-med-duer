using System.ComponentModel.DataAnnotations;
using DataAccess.Entities;
using service.Abstractions;

namespace service.Models.Responses;

public class ExtendedBoardResponse : BaseBoardResponse
{
    [Required] public double InitialPrice { get; set; } = 20;
    [Required] public int TotalWeeks { get; set; } = 0;
    [Required] public int WeeksRemaining { get; set; } = 0;
    [Required] public DateTime StartDate { get; set; } = new DateTime(2000, 1, 1);
    
    [Required] public bool IsActive { get; set; } = false;
    
    public ExtendedBoardResponse(Board board) : base(board)
    {
        InitialPrice = IMoneyHandler.GetBoardPrices(board.PlayedNumbers.Count);
        StartDate = board.StartDate;
    }
    
    public ExtendedBoardResponse(Board board, int totWeeks, int remWeeks) : base(board)
    {
        InitialPrice = IMoneyHandler.GetBoardPrices(board.PlayedNumbers.Count);
        StartDate = board.StartDate;
        TotalWeeks = totWeeks;
        WeeksRemaining = remWeeks;
        IsActive = remWeeks > 0; // kan man nok også regne ud i frontend ig
    }
    
}