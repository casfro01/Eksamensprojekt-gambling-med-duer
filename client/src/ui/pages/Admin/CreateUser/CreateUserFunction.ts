import type {RegisterRequest, RegisterResponse} from "../../../../core/ServerAPI.ts";
import {authClient} from "../../../../core/api-clients.ts";

export async function createUser(userDTO: RegisterRequest): Promise<RegisterResponse> {
    return await authClient.register(userDTO);
}