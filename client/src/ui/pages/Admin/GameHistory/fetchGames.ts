import {useEffect, useState} from "react";
import {gameClient} from "../../../../core/api-clients.ts";
import type {ExtendedGameResponse} from "../../../../core/ServerAPI.ts";
import {convertDateStringToPrettyString} from "../../../../utils/DateConverter.ts";

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
    const res = await gameClient.getFinishedGames();
    return res.map(g => mapToGame(g));
}

function mapToGame(game: ExtendedGameResponse): Game{
    return {
        id: game.id,
        weekNumber: "Uge " + game.weekNumber,
        drawDate: convertDateStringToPrettyString(game.startTime),
        winningNumbers: game.winningNumbers,
        totalBoards: game.totalBoardsOnGame,
        winningBoards: game.totalWinningBoards,
        totalRevenue: game.totalRevenue,
        prizePool: game.totalRevenue * 0.7,
        status: 'completed',
    };
}