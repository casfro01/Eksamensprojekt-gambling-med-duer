using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace api.Controllers;

[ApiController]
[AllowAnonymous]
[Route("api/board")]
public class BoardController(IService<BaseBoardResponse, CreateBoardDto, UpdateBoardDto> boardService) : ControllerBase
{
    [HttpGet(nameof(GetBoards))]
    public async Task<List<BaseBoardResponse>> GetBoards()
    {
        return await boardService.Get();
    }
    
    [HttpGet(nameof(GetBoard))]
    public async Task<BaseBoardResponse> GetBoard(string id)
    {
        return await boardService.Get(id);
    }

    [HttpPost(nameof(CreateBoard))]
    public async Task<BaseBoardResponse> CreateBoard(CreateBoardDto dto)
    {
        return await boardService.Create(dto);
    }
}