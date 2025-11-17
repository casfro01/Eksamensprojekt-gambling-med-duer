import { AuthClient, type LoginRequest } from '../../../utils/ServerAPI.ts';

export const handleLogin = async (
    e: React.FormEvent,
    email: string,
    password: string,
    setError: (error: string) => void,
    setLoading: (loading: boolean) => void
) => {
    e.preventDefault();

    // Reset fejlbesked
    setError('');

    // Valider input
    if (!email || !password) {
        setError('Udfyld venligst alle felter');
        return;
    }

    setLoading(true);

    try {
        // Opret AuthClient instance
        const authClient = new AuthClient('http://localhost:5000');

        // Lav login request
        const loginRequest: LoginRequest = {
            email: email,
            password: password
        };

        // Kald login via AuthClient
        const response = await authClient.login(loginRequest);

        // Gem token i localStorage
        if (response.jwt) {
            localStorage.setItem('token', response.jwt);
            console.log('Login succesfuld!', response);
        }

    } catch (err: any) {
        setError(err.message || 'Forkert email eller password');
    } finally {
        setLoading(false);
    }
};