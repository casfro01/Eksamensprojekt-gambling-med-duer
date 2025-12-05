using service.Models.Responses;

namespace service;

public interface IGameService
{
    Task<List<BaseGameResponse>> Get();
    Task<BaseGameResponse> Get(string id);

    Task<BaseGameResponse> SetWinningNumbers(WinningNumbers winningNumbers);
}