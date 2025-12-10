namespace service.Abstractions;

public interface IMoneyHandler
{
    bool HasEnoughMoney(string userID, double amount);

    Task<bool> SubtractMoney(string userID, double amount, bool allowOverdraft);
    
    Task<bool> AddMoney(string userID, double amount);

    double GetBoardPrices(int numberAmount);
}