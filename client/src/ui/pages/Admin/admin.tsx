import {useRef, useState} from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import './admin.css';
import {useRemoveToken} from "../../../core/atoms/token.ts";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(true);
    const setToken = useRemoveToken();

    const menuItems = [
        { path: '/admin/create-user', label: '👤 Opret Bruger', icon: '➕' },
        { path: '/admin/players', label: '👥 Se Spillere', icon: '📋' },
        { path: '/admin/boards', label: '🎲 Se Spillebrætter', icon: '📊' },
        { path: '/admin/payments', label: '💰 Godkend Indbetalinger', icon: '✓' },
        { path: '/admin/winning-numbers', label: '🎯 Indtast Vindernumre', icon: '🔢' },
        { path: '/admin/history', label: '📜 Spilhistorik', icon: '⏱️' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="admin-layout">
            {/* Sidebar Menu */}
            <aside className={`admin-sidebar ${menuOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                    <button
                        className="toggle-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? '◀' : '▶'}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {menuOpen && <span className="nav-label">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button
                        className="logout-btn"
                        onClick={() => {
                            setToken(null);
                            navigate('/');
                        }}
                    >
                        {menuOpen ? '🚪 Log ud' : '🚪'}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
}