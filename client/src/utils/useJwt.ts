import {tokenAtom} from "../core/atoms/token.ts";
import {useAtom} from "jotai";

export const useJwt = () => {
    const [jwt,] = useAtom(tokenAtom);

    return jwt;
}