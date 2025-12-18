export function contains3Numbers(playedNumbers: number[], winningNumbers: number[]): boolean{
    const res = playedNumbers.filter(n => n === winningNumbers[0] || n === winningNumbers[1] || n === winningNumbers[2]);
    return res.length === 3;
}