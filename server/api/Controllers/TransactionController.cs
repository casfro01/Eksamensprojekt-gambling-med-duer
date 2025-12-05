using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using service.Abstractions;
using service.Models.Request;
using service.Models.Responses;
using Sieve.Models;

namespace api.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class TransactionController(IServiceWithSieve<BaseTransactionResponse, CreateTransactionDto, UpdateTransactionDto> service) : ControllerBase
{
    
    [HttpPost(nameof(CreatePendingTransactions))]
    // skal admins også kunne sætte penge ind?, det kan de for nu
    [Authorize(Roles = "Administrator,Bruger")]
    public async Task<BaseTransactionResponse> CreatePendingTransactions([FromBody]CreateTransactionDto dto)
    {
        var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        dto.Id = userID;
        return await service.Create(dto);
    }
    
    [HttpPut(nameof(UpdatePaymentStatus))]
    [Authorize(Roles = "Administrator")]
    public async Task<BaseTransactionResponse> UpdatePaymentStatus([FromBody]UpdateTransactionDto dto)
    {
        return await service.Update(dto);
    }

    [HttpPost(nameof(GetTransactions))]
    [AllowAnonymous]
    public async Task<List<BaseTransactionResponse>> GetTransactions([FromBody]SieveModel model)
    {
        return await service.Get(model);
    }

    [HttpGet(nameof(GetAmountOfTransactions))]
    [Authorize(Roles = "Administrator")]
    public async Task<int> GetAmountOfTransactions()
    {
        if (service is IGetLength lengthService) return await lengthService.GetLength();
        else return 0;
    }
    
    // ved køb af en plade, så skal nummrene bare sendes til serversiden og derefter opdateres deres balance - kan evt. refreshe client siden og hente balancen igen
}