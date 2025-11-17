using DataAccess.Entities;

namespace service.Models.Responses;

public sealed record BaseBoardResponse
{
    public BaseBoardResponse(Board b)
    {
        Id =  b.Id;
    }
    
    public string Id { get; set; } = null!;
}