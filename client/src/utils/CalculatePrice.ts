export const calculatePrice = (amount: number): number => {
    return 0.625 * Math.pow(2, amount);
}