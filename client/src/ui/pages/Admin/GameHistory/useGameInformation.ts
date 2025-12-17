import {useEffect, useState} from "react";
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
    const [winningBoards, setWinningBoards] = useState<WinningBoard[]>([]);

    useEffect(() => {
        getWinningBoardsAsync(expandedGame != null ? expandedGame : "").then(res => setWinningBoards(res))
    }, [expandedGame]);
    return {
        expandedGame,
        setExpandedGame,
        winningBoards,
        setWinningBoards,
    }
}

export async function getWinningBoardsAsync(gameId: string): Promise<WinningBoard[]>{
    const res = await gameClient.getBoardsOfGame(gameId);
    const winBoard = res.boards.filter(b => contains3Numbers(b.playedNumbers == undefined ? [] : b.playedNumbers , res.winningNumbers))
    return winBoard.map(b => mapToWinningBoard(b));
}

function mapToWinningBoard(board: BaseBoardResponse): WinningBoard{
    return {
        playerName: board.user?.fullName == undefined ? "" : board.user?.fullName,
        numbers: board.playedNumbers == undefined ? [] : board.playedNumbers,
        pricePerWeek: calculatePrice(board.playedNumbers?.length == undefined ? 0 : board.playedNumbers?.length),
    }
}

function contains3Numbers(num1: number[], num2: number[]): boolean{
    const res = num1.filter(n => n === num2[0] || n === num2[1] || n === num2[2]);
    return res.length === 3;
}