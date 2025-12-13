using System.ComponentModel.DataAnnotations;
using dataaccess.Enums;
using Sieve.Models;

namespace service.Models.Request;

public class GetBoardsRequest
{
    [Required] public SieveModel SieveModel { get; set; } = null!;
    
    [Required] public BoardsActivityFilter Filter { get; set; } = BoardsActivityFilter.All;
}