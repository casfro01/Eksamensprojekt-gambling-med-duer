import {useEffect, useState} from "react";
import { boardClient } from "../../../../core/api-clients";
import type { BaseBoardResponse } from "../../../../core/ServerAPI";
import { useSelectNumbers } from "../SelectNumbers/useSelectNumbers";


export interface Board {
    id: string;
    numbers: number[];
    startDate: string;
    status: 'active' | 'completed';
    isWinner: boolean;
    weeksTotal: number;
    weeksRemaining: number;
    pricePerWeek: number;
    totalPrice: number;
}

export type FilterType = 'active' | 'completed';

export const useFetchUserBoards = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [filter, setFilter] = useState<FilterType>('active');
    const selectNumbers = useSelectNumbers();

    useEffect(() => {
        fetchBoards(selectNumbers).then(res => {
            console.log("Fetched boards:", res);
            setBoards(res);
        })
    }, []);
    return{
        boards,
        filter,
        setFilter,
    }
}

async function fetchBoards(selectNumbers: any) {
    const response = await boardClient.getBoards();
   
    const calculatePricePerWeek = selectNumbers.calculatePricePerWeek;
    return response.map((board: BaseBoardResponse) => {
        return {
            id: board.id ?? "",
            numbers: board.playedNumbers ?? [],
            startDate: board.games?.[0]?.startTime,
            status: board.games?.some(game => game.gameStatus === 0) ? 'completed' : 'active',
            isWinner: board.games?.some(game => game.winningNumbers === board.playedNumbers) ?? false,
            weeksTotal: board.games?.length,
            weeksRemaining: board.games?.filter(game => game.gameStatus == 1).length,
            pricePerWeek: calculatePricePerWeek(board.playedNumbers?.length),
            totalPrice: calculatePricePerWeek(board.playedNumbers?.length) * (board.games?.length!),
        } as Board;
    });
}