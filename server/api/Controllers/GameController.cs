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
    
    [HttpGet(nameof(GetGames))]
    [Authorize(Roles = "Administrator")]
    public async Task<List<BaseGameResponse>> GetGames()
    {
        return await gameService.Get();
    }
    
    [HttpGet(nameof(GetGame))]
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