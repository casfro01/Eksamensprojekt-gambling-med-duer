import {useState} from "react";

export const useChangePassword = () => {
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    return {
        passwordForm,
        setPasswordForm,
    }
}