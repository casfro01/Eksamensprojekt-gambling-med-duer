import {useState} from "react";

export const useAdminPanel = () => {
    const [menuOpen, setMenuOpen] = useState(true);

    return{
        menuOpen,
        setMenuOpen,
    }
}