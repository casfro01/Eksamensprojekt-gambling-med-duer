using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using DataAccess.Entities;

namespace service.Models.Responses;

public class BaseBoardResponse
{
    public BaseBoardResponse(Board b)
    {
        Id =  b.Id;
        User = new AuthUserInfo(b.User.Id, b.User.FullName, b.User.Email, b.User.Role.ToString());
        Games = b.Games.Select(g => new BaseGameResponse(g)).ToList();
        PlayedNumbers = b.PlayedNumbers.ToList();
        CreatedOn = b.StartDate;
    }
    
    public string Id { get; set; } = null!;
    
    public AuthUserInfo User { get; set; } = null!;
    
    [Required] public IReadOnlyList<BaseGameResponse> Games { get; set; } = new List<BaseGameResponse>();
    public IReadOnlyList<int> PlayedNumbers { get; set; } = new List<int>();
    
    [Required] public DateTime CreatedOn { get; set; }
}