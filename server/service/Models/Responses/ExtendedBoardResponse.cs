using System.ComponentModel.DataAnnotations;
using DataAccess.Entities;
using service.Abstractions;

namespace service.Models.Responses;

public class ExtendedBoardResponse : BaseBoardResponse
{
    [Required] public double InitialPrice { get; set; } = 20;
    [Required] public int TotalWeeks { get; set; } = 0;
    [Required] public int WeeksRemaining { get; set; } = 0;
    [Required] public DateTime StartDate { get; set; }
    
    [Required] public int WeeksRemaning { get; set; } = 0;
    
    
    public ExtendedBoardResponse(Board board) : base(board)
    {
        InitialPrice = IMoneyHandler.GetBoardPrices(board.PlayedNumbers.Count);
        StartDate = board.StartDate;
    }
    
    public ExtendedBoardResponse(Board board, int weeksRem) : base(board)
    {
        InitialPrice = IMoneyHandler.GetBoardPrices(board.PlayedNumbers.Count);
        StartDate = board.StartDate;
        
        WeeksRemaining =  weeksRem;
    }
    
}