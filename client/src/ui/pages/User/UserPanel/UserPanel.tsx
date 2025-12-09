import { Outlet, useNavigate, useLocation } from 'react-router';
import { useUserPanel } from './UseUserPanel';
import { useRemoveToken } from '../../../../core/atoms/token.ts';
import './userPanel.css';

export default function UserPanel() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isOpen, setIsOpen } = useUserPanel();
    const setToken = useRemoveToken();

    const menuItems = [
        { path: '/user/profile', label: 'Bruger Information', icon: '👤' },
        { path: '/user/deposit', label: 'Indbetaling', icon: '💰' },
        { path: '/user/new-board', label: 'Nyt Bræt', icon: '🎲' },
        { path: '/user/boards', label: 'Mine Plader', icon: '📋' },
        { path: '/user/transactions', label: 'Transaktionshistorik', icon: '💳' }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="user-panel-layout">
            <aside className={`user-sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2>Brugerpanel</h2>
                    <button
                        className="toggle-btn"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? '◀' : '▶'}
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
                            {isOpen && <span className="nav-label">{item.label}</span>}
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
                        {isOpen ? '🚪 Log ud' : '🚪'}
                    </button>
                </div>
            </aside>

            <main className="user-content">
                <Outlet />
            </main>
        </div>
    );
}