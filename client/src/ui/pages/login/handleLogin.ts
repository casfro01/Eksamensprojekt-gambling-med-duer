import type {LoginRequest} from "../../../core/ServerAPI.ts";
import {authClient} from "../../../core/api-clients.ts";

export const handleLogin = async (
    e: React.FormEvent,
    email: string,
    password: string,
    setError: (error: string) => void,
    setLoading: (loading: boolean) => void,
    setJwt: (token: string) => void,
): Promise<string | null> => {
    e.preventDefault();

    // Reset fejlbesked
    setError('');

    // Valider input
    if (!email || !password) {
        setError('Udfyld venligst alle felter');
        return null;
    }

    setLoading(true);

    try {
        // Opret AuthClient instance

        // Lav login request
        const loginRequest: LoginRequest = {
            email: email,
            password: password
        };

        // Kald login via AuthClient
        const response = await authClient.login(loginRequest);

        // Gem token i localStorage
        if (response.jwt) {
            setJwt(response.jwt);
            //console.log('Login succesfuld!', response);
            return response.jwt
        }
        return null;

    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Forkert email eller password');
        }
    } finally {
        setLoading(false);
    }
    return null; // dette forhindre typen "undefined" i at blive tilføjet til metode typen.
};