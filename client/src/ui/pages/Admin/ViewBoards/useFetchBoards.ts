import {useEffect, useState} from "react";
import {gameClient} from "../../../../core/api-clients.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";
import type {BaseBoardResponse, BaseGameResponse} from "../../../../core/ServerAPI.ts";
import {calculatePrice} from "../../../../utils/CalculatePrice.ts";
import {convertDateStringToPrettyString} from "../../../../utils/DateConverter.ts";

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

interface MyPackage{
    boards: Board[];
    game: BaseGameResponse;
}


export const useFetchBoards = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [currentWeekWinningNumbers] = useState<number[]>([2, 8, 13]); // måske hentes fra databasen / indtaster et ugenummer osv
    const [currentGame, setCurrentGame] = useState<BaseGameResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        setLoading(true)
        fetchBoards().then((res) => {
            setBoards(res.boards);
            setCurrentGame(res.game);
            setLoading(false);
        }).catch(e => {setError(e); setLoading(false)});
    }, []);
    return {
        boards,
        currentGame,
        loading,
        error,
        currentWeekWinningNumbers
    };
}

async function fetchBoards() {
    const si = SieveQueryBuilder.create<BaseGameResponse>()
        .sortByDescending("startDate")
        .filterEquals("gameStatus", 2)
        .page(1)
        .pageSize(1)
        .buildSieveModel();
    const res = await gameClient.getFinishedGames(si);
    const id = res[0].id;
    const boards = await gameClient.getBoardsOfGame(id);
    return {
        boards: boards.boards.map(board => mapToBoard(board)),
        game: res[0] as BaseGameResponse,
    } as MyPackage;
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