using System.ComponentModel.DataAnnotations;

namespace service.Models.Request;

public class UpdateBoardDto
{
    [Required] public string UserId  { get; set; } = null!;
    [Required] public string BoardId { get; set; } = null!;
}