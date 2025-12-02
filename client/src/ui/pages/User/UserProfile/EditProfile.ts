import {useState} from "react";

export const useEditProfile = () => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    return {
        isEditingProfile,
        isChangingPassword,
        showPassword,
        setIsEditingProfile,
        setIsChangingPassword,
        setShowPassword
    }
}