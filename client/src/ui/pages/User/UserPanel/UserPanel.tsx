import { Outlet } from 'react-router';
import { useUserPanel } from './UseUserPanel.ts';
import './userPanel.css';

export default function UserPanel() {
    const { isOpen, menuItems, toggleSidebar, navigateTo, isActive } = useUserPanel();

    return (
        <div className="user-panel-layout">
            <aside className={`user-sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2>Brugerpanel</h2>
                    <button
                        className="toggle-btn"
                        onClick={toggleSidebar}
                    >
                        {isOpen ? '◀' : '▶'}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                            onClick={() => navigateTo(item.path)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="user-content">
                <Outlet />
            </main>
        </div>
    );
}