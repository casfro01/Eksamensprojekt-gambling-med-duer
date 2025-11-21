import { useState } from 'react';
import {useAtom} from "jotai";
import {tokenAtom} from "../../../core/atoms/token.ts";

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [, setJwt] = useAtom(tokenAtom);
    
    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        loading,
        setLoading,
        setJwt
    };
};