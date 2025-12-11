import {useEffect, useState} from "react";
import {boardClient} from "../../../../core/api-clients.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";
import type {BaseBoardResponse} from "../../../../core/ServerAPI.ts";

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
    useEffect(() => {
        fetchBoards("").then(res => {
            setBoards(res);
            console.log(JSON.stringify(res));
        })
    }, []);
    return{
        boards,
        filter,
        setFilter,
    }
}

async function fetchBoards(status: string): Promise<Board[]> {
    const query = SieveQueryBuilder.create<BaseBoardResponse>();
    query.page(1);
    query.pageSize(10);
    console.log(status); // brug status
    const res = await boardClient.getBoards(query.buildSieveModel());
    return res.map(board => boardResponseToBoard(board));
}

function boardResponseToBoard(board: BaseBoardResponse): Board {
    return {
        id: board.id,
        numbers: board.playedNumbers,
        weeksTotal: 4000, // replace lig
        weeksRemaining: 1000, // place
        pricePerWeek: 10000, // replace
        totalPrice: 10000, // replace
        startDate: "00000", // replace
        status: 'active',
    } as Board;
}