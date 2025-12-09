import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

interface MenuItem {
    path: string;
    label: string;
    icon: string;
}

export const useUserPanel = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems: MenuItem[] = [
        { path: '/user/profile', label: 'Bruger Information', icon: '👤' },
        { path: '/user/deposit', label: 'Indbetaling', icon: '💰' },
        { path: '/user/new-board', label: 'Nyt Bræt', icon: '🎲' },
        { path: '/user/boards', label: 'Mine Brætter', icon: '📋' },  // <-- TILFØJ DENNE LINJE
        { path: '/user/game-history', label: 'Spilhistorik', icon: '📜' },
        { path: '/user/transactions', label: 'Transaktionshistorik', icon: '💳' }
    ];

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navigateTo = (path: string) => {
        navigate(path);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return {
        isOpen,
        menuItems,
        toggleSidebar,
        navigateTo,
        isActive
    };
};