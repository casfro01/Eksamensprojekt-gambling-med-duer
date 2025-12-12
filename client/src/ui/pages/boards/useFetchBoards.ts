import {useEffect, useState} from "react";
import {boardClient} from "../../../core/api-clients.ts";
import type {BaseBoardResponse} from "../../../core/ServerAPI.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";

export type DeadPigeonBoard = BaseBoardResponse & { [key: string]: unknown };

export const useFetchBoards = () => {
    const [boards, setBoards] = useState<DeadPigeonBoard[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [refresh, setRefresh] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchBoards()
        .then(boards => {
            const enriched = (boards ?? []).map((b) => ({ ...(b as Record<string, unknown>) })) as DeadPigeonBoard[];
            setBoards(enriched);
            setLastUpdated(new Date());
        })
        .catch(e => {
            console.error(e);
            setError('Kunne ikke hente brætterne lige nu. Prøv igen om et øjeblik.');
        })
        .finally(() => setLoading(false));
    }, [refresh])
    return {
        boards,
        loading,
        error,
        lastUpdated,
        refresh,
        // update metoder, er usikker om de skal bruges i UI, måske en refresh idk
        setBoards,
        setLoading,
        setError,
        setLastUpdated,
        setRefresh,
    }
}

async function fetchBoards() {
    return await boardClient.getBoards(SieveQueryBuilder.create<BaseBoardResponse>().buildSieveModel());
}