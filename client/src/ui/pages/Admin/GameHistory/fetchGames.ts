import {useEffect, useState} from "react";
import {gameClient} from "../../../../core/api-clients.ts";
import type {BaseGameResponse, ExtendedGameResponse} from "../../../../core/ServerAPI.ts";
import {convertDateStringToPrettyString} from "../../../../utils/DateConverter.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";

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


export function useFetchGames(){
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetchGames().then( res => setGames(res));
    }, [])

    return games;
}

async function fetchGames(): Promise<Game[]> {
    const sieve = SieveQueryBuilder.create<BaseGameResponse>()
        .filterEquals("gameStatus", 0)
        .sortByDescending("startDate")
        .page(1)
        .pageSize(10)
        .buildSieveModel(); // henter de 10 seneste spil
    const res = await gameClient.getFinishedGames(sieve);
    return res.map(g => mapToGame(g));
}

function mapToGame(game: ExtendedGameResponse): Game{
    return {
        id: game.id,
        weekNumber: "Uge " + game.weekNumber,
        drawDate: convertDateStringToPrettyString(game.startDate),
        winningNumbers: game.winningNumbers,
        totalBoards: game.totalBoardsOnGame,
        winningBoards: game.totalWinningBoards,
        totalRevenue: game.totalRevenue,
        prizePool: game.totalRevenue * 0.7,
        status: 'completed',
    };
}