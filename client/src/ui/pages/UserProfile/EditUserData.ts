import {useState} from "react";
import type {UserData} from "../../../core/ServerAPI.ts";

export const useEditUserData = (userData: UserData | null) => {
    const [editForm, setEditForm] = useState({
        fullName: userData == null ? "....." : userData.fullName,
        email: userData == null ? "....." : userData.email,
        phone: userData == null ? "....." : userData.phoneNumber,
    });

    return {
        editForm,
        setEditForm,
    }
}