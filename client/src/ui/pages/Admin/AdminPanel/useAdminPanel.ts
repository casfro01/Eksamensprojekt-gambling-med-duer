import { useState, useEffect } from "react";

export const useAdminPanel = () => {
    const [menuOpen, setMenuOpen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        menuOpen,
        setMenuOpen,
    }
}