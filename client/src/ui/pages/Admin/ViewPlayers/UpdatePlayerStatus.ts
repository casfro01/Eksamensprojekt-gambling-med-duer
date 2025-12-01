import {authClient} from "../../../../core/api-clients.ts";
import type {UpdateUserStatusDto} from "../../../../core/ServerAPI.ts";

export async function UpdatePlayerStatus(playerID: string, status: boolean){
    const dto: UpdateUserStatusDto = {
        id: playerID,
        status: status
    }
    await authClient.setUserStatus(dto);
    // TODO : hvis bruger dataet skal bruges, så send det tilbage ig.
}