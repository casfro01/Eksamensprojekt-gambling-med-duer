import {useEffect, useState} from "react";

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
        fetchBoards().then(res => {
            setBoards(res);
        })
    }, []);
    return{
        boards,
        filter,
        setFilter,
    }
}

async function fetchBoards() {
    return await [
        {
            id: '1',
            numbers: [3, 7, 12, 15, 16],
            weeksTotal: 5,
            weeksRemaining: 3,
            pricePerWeek: 20,
            totalPrice: 100,
            startDate: '2025-11-20',
            status: 'active'
        },
        {
            id: '2',
            numbers: [1, 5, 8, 14],
            weeksTotal: 2,
            weeksRemaining: 2,
            pricePerWeek: 20,
            totalPrice: 40,
            startDate: '2025-11-25',
            status: 'active'
        },
        {
            id: '3',
            numbers: [2, 6, 9, 11, 13],
            weeksTotal: 4,
            weeksRemaining: 0,
            pricePerWeek: 20,
            totalPrice: 80,
            startDate: '2025-10-15',
            status: 'completed',
            isWinner: true
        },
        {
            id: '4',
            numbers: [4, 7, 10, 12, 15, 16],
            weeksTotal: 3,
            weeksRemaining: 0,
            pricePerWeek: 40,
            totalPrice: 120,
            startDate: '2025-10-01',
            status: 'completed',
            isWinner: false
        }
    ] as Board[];
}