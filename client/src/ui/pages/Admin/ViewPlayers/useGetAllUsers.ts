import {useEffect, useRef, useState} from "react";
import type {GetAllUsersResponse, UserData} from "../../../../core/ServerAPI.ts";
import type {StateFilter} from "./ViewPlayers.tsx";
import {authClient} from "../../../../core/api-clients.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";

export const useGetAllUsers = () => {
    const [filter, setFilter] = useState<StateFilter>("all");
    const [page, setPage] = useState(1);
    const [userData, setUserData] = useState<UserData[]>([]);
    const [allUsers, setAllUsers] = useState<number>(0);
    const [activeUsers, setActiveUsers] = useState<number>(0);
    useEffect(() => {
        getUsers(filter, page).then(res => {
            if (res != null){
                if (res.pagedUsers != null) setUserData(res.pagedUsers);
                if (res.allUsers != null) setAllUsers(res.allUsers);
                if (res.activeUsers != null) setActiveUsers(res.activeUsers);
            }
        })
    }, [filter, page])


    return {
        filter,
        setFilter,
        page,
        setPage,
        allUsers,
        activeUsers,
        userData
    }
}

async function getUsers(ActiveFiler: string, page: number): Promise<GetAllUsersResponse>{
    const query = SieveQueryBuilder.create<UserData>();
    if (ActiveFiler !== "all") query.filterEquals("isActive", ActiveFiler === "active" ? "true" : "false");
    query.pageSize(10)
    .page(page)
    const jens = query.buildSieveModel();
    return await authClient.getAllUsers(jens);
}