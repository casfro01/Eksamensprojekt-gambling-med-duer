import {useState} from "react";
import {gameClient} from "../../../../core/api-clients"
import type {WinningNumbers} from "../../../../core/ServerAPI";
export const useSetWinningNumbers = () => {
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [currentWeek, setCurrentWeek] = useState<string>('');
    const [drawDate, setDrawDate] = useState<string>(new Date().toISOString().split('T')[0]);
    
    return {
        selectedNumbers,
        setSelectedNumbers,
        currentWeek,
        setCurrentWeek,
        drawDate,
        setDrawDate
    }
}

export async function setWinningNumbers(numbers: number[]) {
    const dto: WinningNumbers = {
        numbers: numbers
    }
    const result = await gameClient.setNumbers(dto);
    return result;
}