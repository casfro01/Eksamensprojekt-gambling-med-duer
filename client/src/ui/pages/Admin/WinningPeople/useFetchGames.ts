import {useEffect, useState} from "react";
import type {BaseGameResponse} from "../../../../core/ServerAPI.ts";
import { gameClient } from "../../../../core/api-clients.ts";


export const useFetchGames = () => {
    const [games, setGames] = useState<BaseGameResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchGames()
        .then(games => {
            console.log('Fetched games:', games);
            setGames(games ?? []);
        })
        .catch(e => {
            console.error('Error fetching games:', e);
            let errorMessage = 'Kunne ikke hente spil lige nu. Prøv igen om et øjeblik.';

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
    return await gameClient.getGames();
}