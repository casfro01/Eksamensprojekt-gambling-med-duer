namespace service.Abstractions;

public interface IMoneyHandler
{
    bool HasEnoughMoney(string userID, double amount);

    Task<bool> SubtractMoney(string userID, double amount, bool allowOverdraft);
    
    Task<bool> AddMoney(string userID, double amount);
    
    public static double GetBoardPrices(int numberAmount)
    {
        if (numberAmount is > 8 or < 5) throw new ArgumentOutOfRangeException();
        return (int) (0.625 * Math.Pow(2, numberAmount));
    }
}