
import './viewPlayers.css';
import {useGetAllUsers} from "./useGetAllUsers.ts";
/*
interface Player {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    isActive: boolean;
    balance: number;
    createdDate: string;
}*/

export type StateFilter = 'all' | 'active' | 'inactive';

export default function ViewPlayers() {
    // Dummy data - skal hentes fra backend senere
    /*
    const [players, setPlayers] = useState<Player[]>([
        {
            id: '1',
            fullName: 'Peter Jensen',
            email: 'peter@email.dk',
            phone: '12345678',
            isActive: true,
            balance: 250,
            createdDate: '2025-01-15'
        },
        {
            id: '2',
            fullName: 'Anna Nielsen',
            email: 'anna@email.dk',
            phone: '87654321',
            isActive: false,
            balance: 0,
            createdDate: '2025-02-20'
        }
    ]);*/
    const {
        filter,
        setFilter,
        page,
        setPage,
        allUsers,
        activeUsers,
        userData
    } = useGetAllUsers()

    //const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

    // TODO : implement
    /*
    const togglePlayerStatus = (id: string) => {
        setPlayers(players.map(p =>
            p.id === id ? {...p, isActive: !p.isActive} : p
        ));
    };*/

    // TODO : implement
    /*
    const deletePlayer = (id: string) => {
        if (confirm('Er du sikker på at du vil slette denne spiller?')) {
            setPlayers(players.filter(p => p.id !== id));
        }
    };*/

    const filteredPlayers = userData /*players.filter(p => {
        if (filter === 'active') return p.isActive;
        if (filter === 'inactive') return !p.isActive;
        return true;
    });*/

    return (
        <div className="view-players-container">
            <div className="players-header">
                <div>
                    <h1>Spillere</h1>
                    <p className="subtitle">Administrer alle spillere i systemet</p>
                </div>
                <div className="header-stats">
                    <div className="stat-box">
                        <span className="stat-label">Total</span>
                        <span className="stat-value">{allUsers}</span>
                    </div>
                    <div className="stat-box active">
                        <span className="stat-label">Aktive</span>
                        <span className="stat-value">{activeUsers}</span>
                    </div>
                </div>
            </div>

            {/* Filter buttons */}
            <div className="filter-bar">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Alle
                </button>
                <button
                    className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Aktive
                </button>
                <button
                    className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
                    onClick={() => setFilter('inactive')}
                >
                    Inaktive
                </button>
            </div>

            {/* Players table */}
            <div className="players-table">
                <table>
                    <thead>
                    <tr>
                        <th>Navn</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Oprettet</th>
                        <th>Handlinger</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredPlayers.map((player) => (
                        <tr key={player.id}>
                            <td className="player-name">{player.fullName}</td>
                            <td>{player.email}</td>
                            <td>{player.phoneNumber}</td>
                            <td className="balance">{player.balance} DKK</td>
                            <td>
                  <span className={`status-badge ${player.isActive ? 'active' : 'inactive'}`}>
                    {player.isActive ? 'Aktiv' : 'Inaktiv'}
                  </span>
                            </td>
                            <td>{"TILFØJ DATO"/*new Date(player.createdDate).toLocaleDateString('da-DK')*/}</td>
                            <td className="actions">
                                <button
                                    className="action-btn toggle"
                                    onClick={() => console.log("toggle")/*() => togglePlayerStatus(player.id)*/}
                                    title={player.isActive ? 'Deaktiver' : 'Aktiver'}
                                >
                                    {player.isActive ? '⏸️' : '▶️'}
                                </button>
                                <button
                                    className="action-btn edit"
                                    title="Rediger"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="action-btn delete"
                                    onClick={() => console.log("Delete")/*() => deletePlayer(player.id)*/}
                                    title="Slet"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}