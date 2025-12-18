import {SieveQueryBuilder} from "ts-sieve-query-builder";
import type {BaseBoardResponse, BaseGameResponse} from "../ServerAPI.ts";
import {gameClient} from "../api-clients.ts";

export interface MyPackage{
    boards: BaseBoardResponse[];
    game: BaseGameResponse;
}


export async function fetchBoards() {
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
        boards: boards.boards /*boards.boards.map(board => mapToBoard(board))*/,
        game: res[0] as BaseGameResponse,
    } as MyPackage;
}