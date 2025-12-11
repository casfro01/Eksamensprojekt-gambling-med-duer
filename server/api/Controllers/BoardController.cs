using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;
using Sieve.Models;

namespace api.Controllers;

[ApiController]
[Route("api/board")]
public class BoardController(IServiceWithSieve<BaseBoardResponse, CreateBoardDto, UpdateBoardDto> boardService, IMoneyHandler moneyHandler) : ControllerBase
{
    [HttpPost(nameof(GetBoards))]
    [Authorize(Roles = "Administrator,Bruger")]
    public async Task<List<BaseBoardResponse>> GetBoards([FromBody]SieveModel model)
    {
        var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        model.Filters = "UserId==" + userID;
        return await boardService.Get(model);
    }
    
    
    [HttpGet(nameof(GetBoard))]
    [Authorize(Roles = "Administrator")]
    public async Task<BaseBoardResponse> GetBoard(string id)
    {
        var model = new SieveModel
        {
            Filters = "Id==" + id
        };
        var res = await boardService.Get(model);
        return res.First();
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