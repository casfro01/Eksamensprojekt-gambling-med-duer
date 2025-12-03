import {useState} from "react";
import {authClient} from "../../../../core/api-clients.ts";
import type {ChangePasswordRequest} from "../../../../core/ServerAPI.ts";

export const useChangePassword = () => {
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const sendPassword = async (userID: string) =>{
        const dto: ChangePasswordRequest = {
            userID: userID,
            newPassword: passwordForm.newPassword,
            previousPassword: passwordForm.currentPassword,
        }
        return await authClient.updatePassword(dto);
    }
    return {
        passwordForm,
        setPasswordForm,
        sendPassword,
    }
}