using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using service;
using service.Models.Responses;
using Sieve.Models;

namespace api.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class GameController(IGameService gameService) : ControllerBase
{
    // TODO : bruge sieve og pagination, men for nu er det godt nok ig
    [HttpGet(nameof(GetFinishedGames))]
    [Authorize(Roles = "Administrator")]
    public async Task<List<ExtendedGameResponse>> GetFinishedGames()
    {
        SieveModel model = new SieveModel
        {
            Filters = "gamestatus==0",
            Sorts = "-startdate",
        };
        return await gameService.Get(model);
    }
    
    [HttpPost(nameof(GetBoardsOfGame))]
    [Authorize(Roles = "Administrator")]
    public async Task<GameWithBoardResponse> GetBoardsOfGame(string gameId)
    {
        SieveModel model = new SieveModel
        {
            Filters = "Id=="+gameId,
        };
        var res = await gameService.Get(gameId);
        if (res is GameWithBoardResponse g)
            return g;
        throw new NotImplementedException("Not implemented correctly");
    }
    
    [HttpGet(nameof(GetGames))]
    [Authorize(Roles = "Administrator")]
    public async Task<List<BaseGameResponse>> GetGames()
    {
        return await gameService.Get();
    }
    
    [HttpPost(nameof(GetGame))]
    [Authorize(Roles = "Administrator")]
    public async Task<BaseGameResponse> GetGame(string id)
    {
        return await gameService.Get(id);
    }

    [HttpPost(nameof(SetNumbers))]
    [Authorize(Roles = "Administrator")]
    public async Task<BaseGameResponse> SetNumbers(WinningNumbers winningNumbers)
    {
        return await gameService.SetWinningNumbers(winningNumbers);
    }
}