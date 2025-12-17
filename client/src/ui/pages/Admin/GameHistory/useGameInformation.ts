import {useState} from "react";
import type {WinningBoard} from "./fetchGames.ts";
import {gameClient} from "../../../../core/api-clients.ts";
import type {BaseBoardResponse} from "../../../../core/ServerAPI.ts";
import {calculatePrice} from "../../../../utils/CalculatePrice.ts";


export interface WinningBoard {
    playerName: string;
    numbers: number[];
    pricePerWeek: number;
}

export const useGameInformation = () => {
    const [expandedGame, setExpandedGame] = useState<string | null>(null);

    return {
        expandedGame,
        setExpandedGame,
    }
}

export async function getWinningBoardsAsync(gameId: string): Promise<WinningBoard[]>{
    const res = await gameClient.getBoardsOfGame(gameId);
    return res.boards.map(b => mapToWinningBoard(b));
}

function mapToWinningBoard(board: BaseBoardResponse): WinningBoard{
    return {
        playerName: board.user?.fullName,
        numbers: board.playedNumbers,
        pricePerWeek: calculatePrice(board.playedNumbers?.length == undefined ? 0 : board.playedNumbers?.length),
    }
}