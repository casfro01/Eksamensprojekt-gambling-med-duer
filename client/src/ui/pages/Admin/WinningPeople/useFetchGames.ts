import {useEffect, useState} from "react";
import type {BaseGameResponse, ExtendedGameResponse} from "../../../../core/ServerAPI.ts";
import { gameClient } from "../../../../core/api-clients.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";


export const useFetchGames = () => {
    const [games, setGames] = useState<ExtendedGameResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchGames()
        .then(game => {
            console.log('Fetched games:', game);
            setGames(game[0]);
        })
        .catch(e => {
            console.error('Error fetching games:', e);
            const errorMessage = 'Kunne ikke hente spil lige nu. Prøv igen om et øjeblik.';

            setError(errorMessage);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);
    return {
        games,
        loading,
        error,
        setGames,
    }
}

async function fetchGames() {
    return await gameClient.getFinishedGames(SieveQueryBuilder.create<BaseGameResponse>().page(1).pageSize(1).sortByDescending("startDate").filterEquals("gameStatus", 0).buildSieveModel());
}