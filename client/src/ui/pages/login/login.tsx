import React from 'react';
import './login.css';
import { useLogin } from './useLogin.ts';
import { handleLogin } from './handleLogin.ts';
import { useNavigate } from "react-router";
import {getRoleFromJwt, useIsValidLogin} from "../../../utils/checkLogin.ts";
import {useCheckIsLoggedin} from "./useCheckIsLoggedin.ts";

export default function Login(){
    const navigate = useNavigate();
    // Hent state fra useLogin hook
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        loading,
        setLoading,
        setJwt,
        Jwt,
    } = useLogin();

    useCheckIsLoggedin(Jwt);

    const onSubmit = (e: React.FormEvent) => {
        handleLogin(e, email, password, setError, setLoading, setJwt)
            .then( token => {
                const role = getRoleFromJwt(token)
                if (role === "Administrator"){
                    navigate('/admin/create-user');
                }
                else navigate("/");
            }
            );
    };
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Log ind</h1>

                <form onSubmit={onSubmit} className="login-form">
                    {/* Email input */}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="din@email.dk"
                            disabled={loading}
                        />
                    </div>

                    {/* Password input */}
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            disabled={loading}
                        />
                    </div>

                    {/* Fejlbesked */}
                    {error && <div className="error-message">{error}</div>}

                    {/* Login knap */}
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Logger ind...' : 'Log ind'}
                    </button>
                </form>

                {/* Ekstra links (valgfrit) */}
                <div className="login-footer">
                    <a href="/forgot-password">Glemt password?</a>
                </div>
            </div>
        </div>
    );
}