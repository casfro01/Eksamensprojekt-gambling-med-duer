using System.Diagnostics;
using DataAccess.Entities;

namespace service.Models.Responses;

public sealed record BaseBoardResponse
{
    public BaseBoardResponse(Board b)
    {
        Id =  b.Id;
        User = new AuthUserInfo(b.User.Id, b.User.UserName, b.User.Role.ToString());
        Games = b.Games.Select(g => new BaseGameResponse(g)).ToList();
        PlayedNumbers = b.PlayedNumbers.ToList();
    }
    
    public string Id { get; set; } = null!;
    
    public AuthUserInfo User { get; set; } = null!;
    
    public IReadOnlyList<BaseGameResponse> Games { get; set; } = new List<BaseGameResponse>();
    public IReadOnlyList<int> PlayedNumbers { get; set; } = new List<int>();
}