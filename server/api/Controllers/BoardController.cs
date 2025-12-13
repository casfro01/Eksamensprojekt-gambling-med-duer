using System.ComponentModel.DataAnnotations;
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
    public async Task<List<ExtendedBoardResponse>> GetBoards([FromBody]SieveModel model)
    {
        var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        model.Filters = "UserId==" + userID;
        List<BaseBoardResponse> res = await boardService.Get(model);
        return res.First() is ExtendedBoardResponse ? res.Cast<ExtendedBoardResponse>().ToList() : ([]);
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
        double price = IMoneyHandler.GetBoardPrices(dto.PlayedNumbers.Count);
        // TODO : hvis nu at createboard fejler i boardservice - så bliver brugerens penge trukket uden at de får en plade - så dette skal lige laves om
        if (await moneyHandler.SubtractMoney(userID, price, false))
        {
            return await boardService.Create(dto);
        } 
        
        throw new Exception("Not enough money.");
    }


    [HttpPost(nameof(CancelCurrentWeeks))]
    [Authorize(Roles = "Administrator,Bruger")]
    public async Task<BaseBoardResponse> CancelCurrentWeeks([FromBody]UpdateBoardDto dto)
    {
        dto.UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new ValidationException("Cannot find user to this board, try again when you are sure that you know who you are.");
        return await boardService.Update(dto);
    }
}