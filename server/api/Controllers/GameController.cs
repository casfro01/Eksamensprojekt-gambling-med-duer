using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using service;
using service.Models.Responses;

namespace api.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class GameController(IGameService gameService) : ControllerBase
{
    [HttpGet(nameof(GetGames))]
    [AllowAnonymous]
    public async Task<List<BaseGameResponse>> GetGames()
    {
        return await gameService.Get();
    }
    
    [HttpGet(nameof(GetGame))]
    [AllowAnonymous]
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