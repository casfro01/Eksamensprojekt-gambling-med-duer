import {useEffect} from "react";
import {useNavigate} from "react-router";
import {getRoleFromJwt} from "../../../utils/checkLogin.ts";

export const useCheckIsLoggedin = (jwt: string | null) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (jwt != null) {
            const role = getRoleFromJwt(jwt)
            if (role === "Administrator") {
                navigate("/admin/create-user")
            }
            else navigate("/");
        }
    }, [jwt, navigate]);
}