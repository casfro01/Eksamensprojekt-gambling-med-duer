import {useState} from "react";
import type {BaseBoardResponse} from "../../../../core/ServerAPI.ts";
import {calculatePrice} from "../../../../utils/CalculatePrice.ts";
import {convertDateStringToPrettyString} from "../../../../utils/DateConverter.ts";
import {useFetchBoards} from "../../../../utils/Hooks/useFetchBoards.ts";

export interface Board {
    id: string;
    playerName: string;
    numbers: number[];
    weeks: number;
    pricePerWeek: number;
    totalPrice: number;
    createdDate: string;
    gameId: string;
    isWinning: boolean;
}



export const useFetchBoardsAdaptor = () => {
    const {boards: b, currentGame: g} = useFetchBoards();

    const boards = b.map(board => mapToBoard(board))
    const [currentWeekWinningNumbers] = useState<number[]>([2, 8, 13]); // måske hentes fra databasen / indtaster et ugenummer osv

    const currentGame = g;
    return {
        boards,
        currentGame,
        currentWeekWinningNumbers
    };
}

function mapToBoard(b: BaseBoardResponse): Board {
    return {
        id: b.id,
        playerName: b.user?.fullName,
        numbers: b.playedNumbers,
        weeks: 1, // hardcoded for now
        pricePerWeek: calculatePrice(b.playedNumbers?.length == undefined ? 1 : b.playedNumbers?.length),
        totalPrice: calculatePrice(b.playedNumbers?.length == undefined ? 1 : b.playedNumbers?.length),
        createdDate: convertDateStringToPrettyString(b.createdOn),
        isWinning: false
    } as Board
}