import {useAtom} from "jotai";
import {tokenAtom, userInfoAtom} from "../../../core/atoms/token.ts";
import type {UserData} from "../../../core/ServerAPI.ts";

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
    const setUserData = (userData: UserData) => {
        console.log(userData);
        throw new Error("Not implemented yet; opdater kun navn email og tlf. ya know -> buissness logik");
    };
    return {
        authUser,
        setUserData,
    };
}