import {useEffect, useState} from "react";

export interface Board {
    id: string;
    playerName: string;
    numbers: number[];
    weeks: number;
    pricePerWeek: number;
    totalPrice: number;
    createdDate: string;
    isWinning: boolean;
}


export const useFetchBoards = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [currentWeekWinningNumbers] = useState<number[]>([2, 8, 13]); // måske hentes fra databasen / indtaster et ugenummer osv
    useEffect(() => {
        fetchBoards().then((res) => {
            setBoards(res);
        });
    }, []);
    return {
        boards,
        currentWeekWinningNumbers
    };
}

async function fetchBoards() {
    return await [
        {
            id: '1',
            playerName: 'Peter Jensen',
            numbers: [1, 5, 7, 12, 15],
            weeks: 3,
            pricePerWeek: 20,
            totalPrice: 60,
            createdDate: '2025-01-20',
            isWinning: false
        },
        {
            id: '2',
            playerName: 'Anna Nielsen',
            numbers: [2, 4, 8, 10, 13, 14, 16],
            weeks: 1,
            pricePerWeek: 80,
            totalPrice: 80,
            createdDate: '2025-01-21',
            isWinning: true
        }
    ];
}