using System.ComponentModel.DataAnnotations;
using DataAccess.Entities;

namespace service.Models.Responses;

public record GameWithBoardResponse : BaseGameResponse
{
    [Required] public List<BaseBoardResponse> Boards { get; set; } = [];
    public GameWithBoardResponse(Game game) : base(game)
    {
        Boards = game.Boards.Select(b => new BaseBoardResponse(b)).ToList();
    }
}