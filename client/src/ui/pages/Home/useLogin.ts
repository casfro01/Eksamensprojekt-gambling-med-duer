import {useAtom} from "jotai";
import {tokenAtom, userInfoAtom} from "../../../core/atoms/token.ts";
import type {UserData} from "../../../core/ServerAPI.ts";
import {updateProfileData} from "../UserProfile/EditUserData.ts";
import {useEffect, useState} from "react";
import {authClient} from "../../../core/api-clients.ts";

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
    const [authUser, setData] = useState<UserData | null>(null);
    const [refresh, setRefresh] = useState<number>(0);
    const setUserData = async (userData: UserData) => {
        return await updateProfileData(userData)
    };

    useEffect(() => {
        async function getData(): Promise<UserData>{
            return await authClient.userInfo();
        }
        getData().then(res => setData(res));
    }, [refresh]);
    return {
        authUser,
        setUserData,
        refresh,
        setRefresh,
    };
}