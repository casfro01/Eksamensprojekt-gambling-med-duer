import {useEffect, useState} from "react";
import type {BaseBoardResponse, BaseGameResponse} from "../../core/ServerAPI.ts";
import {fetchBoards} from "../../core/FetchMetods/FetchBoards.ts";

export const useFetchBoards = () => {
    const [boards, setBoards] = useState<BaseBoardResponse[]>([]);
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