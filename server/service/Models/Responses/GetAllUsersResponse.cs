namespace service.Models.Responses;

public class GetAllUsersResponse
{
    public List<UserData> PagedUsers { get; set; } = new();
    public int AllUsers { get; set; } = 0;
    public int ActiveUsers { get; set; } = 0;
}