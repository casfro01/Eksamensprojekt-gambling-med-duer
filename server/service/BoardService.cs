using System.ComponentModel.DataAnnotations;
using dataaccess;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace service;

public class BoardService(MyDbContext db): IService<BaseBoardResponse, CreateBoardDto, UpdateBoardDto>
{
    public Task<List<BaseBoardResponse>> Get()
    {
        return db.Boards
            .Include(b => b.Games)
            .Select(b => new BaseBoardResponse(b)).ToListAsync();
    }

    public async Task<BaseBoardResponse> Get(string id)
    {
        var board = await db.Boards.FirstOrDefaultAsync(b => b.Id == id);
        return board == null ? throw new KeyNotFoundException("Board not found") : new BaseBoardResponse(board);
    }

    public Task<BaseBoardResponse> Delete(string id)
    {
        throw new NotImplementedException();
    }

    public Task<BaseBoardResponse> Update(UpdateBoardDto dto)
    {
        throw new NotImplementedException();
    }

    public async Task<BaseBoardResponse> Create(CreateBoardDto dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        
        var id = Guid.NewGuid().ToString();

        var board = new Board
        {
            Id = id,
            User = db.Users.First(u => u.Id == dto.UserId),
            Games = dto.Games,
            PlayedNumbers = dto.PlayedNumbers,
        };

        db.Boards.Add(board);
        await db.SaveChangesAsync();
        return new BaseBoardResponse(board);
    }
}