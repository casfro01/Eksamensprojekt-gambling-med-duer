import {useState} from "react";
import type {UpdateUserDto, UserData} from "../../../core/ServerAPI.ts";
import {authClient} from "../../../core/api-clients.ts";

export const useEditUserData = (userData: UserData | null) => {
    const [editForm, setEditForm] = useState({
        fullName: userData == null ? "....." : userData.fullName,
        email: userData == null ? "....." : userData.email,
        phoneNumber: userData == null ? "....." : userData.phoneNumber,
    });

    return {
        editForm,
        setEditForm,
    }
}

export async function updateProfileData(user: UserData | null): Promise<boolean> {
    if (user == null) return false
    const updateDto: UpdateUserDto = {
        id: user.id == null ? "" : user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
    }
    const res = await authClient.updateUserInformation(updateDto)
    return !!res;
}