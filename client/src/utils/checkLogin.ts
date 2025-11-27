import {useAtom} from "jotai";
import {tokenAtom} from "../core/atoms/token.ts";

export const useIsValidLogin = (): boolean => {
    const [Jwt,] = useAtom(tokenAtom);
    if (Jwt == null) return false;

    const payload = decodeJwt<{ exp: number }>(Jwt);
    if (isExpired(payload.exp)) return false;

    // add more logic if needed


    return true;
}

export function getRoleFromJwt(token: string): string | null {
    try {
        const payload = decodeJwt<{ role: string }>(token);

        return payload.role || null;
    } catch {
        return null;
    }
}

function decodeJwt<T>(token: string): T {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

function isExpired(exp: number): boolean {
    return Date.now() >= exp * 1000;
}