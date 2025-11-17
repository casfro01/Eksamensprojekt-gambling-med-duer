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
        // Kald til backend API
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('Forkert email eller password');
        }

        const data = await response.json();

        // Gem token i localStorage
        localStorage.setItem('token', data.jwt);

        console.log('Login succesfuld!', data);

    } catch (err: any) {
        setError(err.message || 'Der skete en fejl. Prøv igen.');
    } finally {
        setLoading(false);
    }
};