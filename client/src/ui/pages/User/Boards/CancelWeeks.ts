import type {Board} from "./useFetchUserBoards.ts";
import {boardClient} from "../../../../core/api-clients.ts";
import type {UpdateBoardDto} from "../../../../core/ServerAPI.ts";

export async function cancelWeeks(board: Board) {
    const dto: UpdateBoardDto = {
        userId: "3kl24ji0f34io49f0e32eodspf2",
        boardId: board.id,
    }

    return await boardClient.cancelCurrentWeeks(dto);
}