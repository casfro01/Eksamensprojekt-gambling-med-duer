using service.Models.Responses;
using Sieve.Models;

namespace service;

public interface IGameService
{
    Task<List<BaseGameResponse>> Get();
    Task<List<ExtendedGameResponse>> Get(SieveModel sieveModel);
    Task<BaseGameResponse> Get(string id);

    Task<BaseGameResponse> SetWinningNumbers(WinningNumbers winningNumbers);
}