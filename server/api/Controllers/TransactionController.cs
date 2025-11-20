using Microsoft.AspNetCore.Mvc;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;

namespace api.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class TransactionController(IService<BaseTransactionResponse, CreateTransactionDto, UpdateTransactionDTO> service) : ControllerBase
{
    [HttpGet(nameof(GetPendingTransactions))]
    public async Task<List<BaseTransactionResponse>> GetPendingTransactions()
    {
        throw new NotImplementedException();
    }
    
    [HttpPost(nameof(GetPendingTransactions))]
    public async Task<BaseTransactionResponse> CreatePendingTransactions([FromBody]CreateTransactionDto dto)
    {
        return await service.Create(dto);
    }
    
    // ved køb af en plade, så skal nummrene bare sendes til serversiden og derefter opdateres deres balance - kan evt. refreshe client siden og hente balancen igen
}