namespace service.Abstractions;

public interface IService<TRes, in TCreate, in TUpdate>
{
    public Task<List<TRes>> Get();
    public Task<TRes> Get(string id);

    public Task<TRes> Create(TCreate request);
    public Task<TRes> Update(TUpdate request);
    public Task<TRes> Delete(string id);
}