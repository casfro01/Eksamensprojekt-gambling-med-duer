import { useState } from 'react';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        loading,
        setLoading,
    };
};