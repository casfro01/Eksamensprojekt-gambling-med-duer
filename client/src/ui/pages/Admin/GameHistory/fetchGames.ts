import {useEffect, useState} from "react";

export interface Game {
    id: string;
    weekNumber: string;
    drawDate: string;
    winningNumbers: number[];
    totalBoards: number;
    winningBoards: number;
    totalRevenue: number;
    prizePool: number;
    status: 'completed' | 'active';
}

export interface WinningBoard {
    playerName: string;
    numbers: number[];
    pricePerWeek: number;
}


export function useFetchGames(){
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetchGames().then( res => setGames(res));
    }, [])

    return games;
}

async function fetchGames(): Promise<Game[]> {
    return [
        {
            id: '1',
            weekNumber: 'Uge 46',
            drawDate: '2025-11-15',
            winningNumbers: [3, 7, 12],
            totalBoards: 15,
            winningBoards: 3,
            totalRevenue: 800,
            prizePool: 560,
            status: 'completed'
        },
        {
            id: '2',
            weekNumber: 'Uge 45',
            drawDate: '2025-11-08',
            winningNumbers: [1, 9, 14],
            totalBoards: 12,
            winningBoards: 2,
            totalRevenue: 640,
            prizePool: 448,
            status: 'completed'
        },
        {
            id: '3',
            weekNumber: 'Uge 44',
            drawDate: '2025-11-01',
            winningNumbers: [5, 8, 16],
            totalBoards: 18,
            winningBoards: 0,
            totalRevenue: 920,
            prizePool: 644,
            status: 'completed'
        }
    ];
}