import {useAtom} from "jotai";
import {tokenAtom, userInfoAtom} from "../../../core/atoms/token.ts";
import type {AuthUserInfo} from "../../../core/ServerAPI.ts";

export const useLoginInformation = () => {
    const [Jwt,] = useAtom(tokenAtom);
    const [authUser,] = useAtom(userInfoAtom);
    const fullName = Jwt == null ? "" : authUser == null ? "" : authUser.fullName;
    return{
        Jwt,
        fullName,
    }
}

export const useGetLoggedInUser = () => {
    const [authUser,] = useAtom(userInfoAtom);
    return authUser as AuthUserInfo;
}