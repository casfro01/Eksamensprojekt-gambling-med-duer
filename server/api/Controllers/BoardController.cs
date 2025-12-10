using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace api.Controllers;

[ApiController]
[Route("api/board")]
public class BoardController(IService<BaseBoardResponse, CreateBoardDto, UpdateBoardDto> boardService, IMoneyHandler moneyHandler) : ControllerBase
{
    [HttpGet(nameof(GetBoards))]
    [AllowAnonymous]
    public async Task<List<BaseBoardResponse>> GetBoards()
    {
        return await boardService.Get();
    }
    
    [HttpGet(nameof(GetBoard))]
    [AllowAnonymous]
    public async Task<BaseBoardResponse> GetBoard(string id)
    {
        return await boardService.Get(id);
    }

    [HttpPost(nameof(CreateBoard))]
    [Authorize(Roles = "Administrator,Bruger")]
    public async Task<BaseBoardResponse> CreateBoard(CreateBoardDto dto)
    {
        var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        double price = moneyHandler.GetBoardPrices(dto.PlayedNumbers.Count);
        if (await moneyHandler.SubtractMoney(userID, price, false))
        {
            return await boardService.Create(dto);
        } 
        
        throw new Exception("Not enough money.");
    }
}