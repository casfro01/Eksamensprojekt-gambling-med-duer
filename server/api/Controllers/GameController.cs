using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using service;
using service.Models.Responses;

namespace api.Controllers;

[ApiController]
[AllowAnonymous]
[Route("api/game")]
public class GameController(IGameService gameService) : ControllerBase
{
    [HttpGet(nameof(GetGames))]
    public async Task<List<BaseGameResponse>> GetGames()
    {
        return await gameService.Get();
    }
    
    [HttpGet(nameof(GetGame))]
    public async Task<BaseGameResponse> GetGame(string id)
    {
        return await gameService.Get(id);
    }

    public async Task<BaseGameResponse> SetNumbers(WinningNumbers winningNumbers)
    {
        return await gameService.SetWinningNumbers(winningNumbers);
    }
}