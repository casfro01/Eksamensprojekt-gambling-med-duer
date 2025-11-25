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
    [Authorize(Roles = "Admin,Bruger")]
    public async Task<BaseTransactionResponse> CreatePendingTransactions([FromBody]CreateTransactionDto dto)
    {
        var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        dto.Id = userID;
        return await service.Create(dto);
    }
    
    [HttpPut(nameof(UpdatePaymentStatus))]
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
    
    // ved køb af en plade, så skal nummrene bare sendes til serversiden og derefter opdateres deres balance - kan evt. refreshe client siden og hente balancen igen
}