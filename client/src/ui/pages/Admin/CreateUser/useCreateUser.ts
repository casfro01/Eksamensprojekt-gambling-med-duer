import {useState} from "react";
import type {RegisterRequest, RegisterResponse} from "../../../../core/ServerAPI.ts";
import {authClient} from "../../../../core/api-clients.ts";

interface FormData{
    fullName: string;
    email: string;
    phone: string;
    password: string;
    isActive: boolean;
}

export const useCreateUser = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        isActive: false // denne er vitterligt altid false når man laver en bruger TODO : dette kan måske ændres
    });

    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return {
        formData,
        setFormData,
        passwordError,
        setPasswordError,
        showPassword,
        setShowPassword,
    }
}



export async function createUserFunction(formData: FormData) {
    const dto: RegisterRequest = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phoneNumber: formData.phone,
    }
    return await createUser(dto);
}

async function createUser(userDTO: RegisterRequest): Promise<RegisterResponse> {
    return await authClient.register(userDTO);
}