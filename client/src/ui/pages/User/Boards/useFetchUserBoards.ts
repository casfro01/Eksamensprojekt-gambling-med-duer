import {useEffect, useState} from "react";
import {boardClient} from "../../../../core/api-clients.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";
import type {ExtendedBoardResponse} from "../../../../core/ServerAPI.ts";

export interface Board {
    id: string;
    numbers: number[];
    weeksTotal: number;
    weeksRemaining: number;
    pricePerWeek: number;
    totalPrice: number;
    startDate: string;
    status: 'active' | 'completed';
    isWinner?: boolean;
}

export type FilterType = 'active' | 'completed';

export const useFetchUserBoards = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [filter, setFilter] = useState<FilterType>('active');
    const [refresh, setRefresh] = useState<number>(0);
    useEffect(() => {
        fetchBoards(filter).then(res => {
            setBoards(res);
        })
    }, [refresh, filter]);
    return{
        boards,
        filter,
        refresh,
        setFilter,
        setRefresh,
    }
}

async function fetchBoards(status: string): Promise<Board[]> {
    const query = SieveQueryBuilder.create<ExtendedBoardResponse>();
    /*query.page(1);
    query.pageSize(10);*/
    console.log(status); // brug status; for lige nu man kan ikke kende forskellen, så det skal tager heroppe
    const res = await boardClient.getBoards(query.buildSieveModel());
    return res.map(board => boardResponseToBoard(board));
}

function boardResponseToBoard(board: ExtendedBoardResponse): Board {
    return {
        id: board.id,
        numbers: board.playedNumbers,
        weeksTotal: board.games.length,
        weeksRemaining: board.weeksRemaining,
        pricePerWeek: board.initialPrice,
        totalPrice: board.games.length * board.initialPrice,
        startDate: board.startDate.toString(),
        status: board.weeksRemaining > 0 ? 'active' : "completed",
    } as Board;
}