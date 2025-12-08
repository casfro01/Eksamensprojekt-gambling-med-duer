import { useState } from 'react';
import { useNavigate } from 'react-router';
import './userBoards.css';

interface Board {
    id: string;
    numbers: number[];
    weeksTotal: number;
    weeksRemaining: number;
    pricePerWeek: number;
    totalPrice: number;
    startDate: string;
    status: 'active' | 'completed';
    isWinner?: boolean;
}

type FilterType = 'active' | 'completed';

export default function UserBoards() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<FilterType>('active');

    // SLET DENNE DATA NÅR BACKEND ER CONNECTED
    const [boards] = useState<Board[]>([
        {
            id: '1',
            numbers: [3, 7, 12, 15, 16],
            weeksTotal: 5,
            weeksRemaining: 3,
            pricePerWeek: 20,
            totalPrice: 100,
            startDate: '2025-11-20',
            status: 'active'
        },
        {
            id: '2',
            numbers: [1, 5, 8, 14],
            weeksTotal: 2,
            weeksRemaining: 2,
            pricePerWeek: 20,
            totalPrice: 40,
            startDate: '2025-11-25',
            status: 'active'
        },
        {
            id: '3',
            numbers: [2, 6, 9, 11, 13],
            weeksTotal: 4,
            weeksRemaining: 0,
            pricePerWeek: 20,
            totalPrice: 80,
            startDate: '2025-10-15',
            status: 'completed',
            isWinner: true
        },
        {
            id: '4',
            numbers: [4, 7, 10, 12, 15, 16],
            weeksTotal: 3,
            weeksRemaining: 0,
            pricePerWeek: 40,
            totalPrice: 120,
            startDate: '2025-10-01',
            status: 'completed',
            isWinner: false
        }
    ]);

    const handleCancelFutureWeeks = (boardId: string, boardNumbers: number[]) => {
        const board = boards.find(b => b.id === boardId);
        if (!board) return;

        const confirmMessage = `⚠️ Annuller fremtidige uger?\n\nBræt: ${boardNumbers.join(', ')}\nTilbageværende uger: ${board.weeksRemaining}\n\nDette vil stoppe de automatiske betalinger og plader spiller kun den aktuelle uge.\n\nEr du sikker?`;

        if (confirm(confirmMessage)) {
            console.log('Annulleret fremtidige uger for bræt:', boardId);
            // Send til backend senere
            alert('✓ Fremtidige uger er annulleret. Dit bræt spiller kun denne uge.');
        }
    };

    const filteredBoards = boards.filter(board => board.status === filter);
    const activeBoards = boards.filter(b => b.status === 'active');
    const completedBoards = boards.filter(b => b.status === 'completed');

    return (
        <div className="user-boards-container">
            <div className="boards-header">
                <div>
                    <h1>Mine Spilleplader</h1>
                    <p className="subtitle">Oversigt over dine aktive og tidligere plader</p>
                </div>
                <div className="stats-summary">
                    <div className="stat-box">
                        <span className="stat-label">Aktive plader</span>
                        <span className="stat-value">{activeBoards.length}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Afsluttede</span>
                        <span className="stat-value">{completedBoards.length}</span>
                    </div>
                </div>
            </div>

            <div className="filter-bar">
                <button
                    className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Aktive ({activeBoards.length})
                </button>
                <button
                    className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Afsluttede ({completedBoards.length})
                </button>
            </div>

            {filteredBoards.length > 0 ? (
                <div className="boards-grid">
                    {filteredBoards.map((board) => (
                        <div
                            key={board.id}
                            className={`board-card ${board.status === 'active' ? 'active-card' : ''} ${board.isWinner ? 'winner-card' : ''}`}
                        >
                            {board.isWinner && (
                                <div className="winner-badge">🏆 VINDER!</div>
                            )}

                            <div className="board-status-badge">
                                {board.status === 'active' ? '🟢 Aktiv' : '⚫ Afsluttet'}
                            </div>

                            <div className="board-numbers-display">
                                <h3>Dine tal:</h3>
                                <div className="board-numbers-grid">
                                    {board.numbers.map(num => (
                                        <span key={num} className="board-number">
                                            {num}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="board-info">
                                <div className="info-row">
                                    <span className="label">Startet:</span>
                                    <span className="value">
                                        {new Date(board.startDate).toLocaleDateString('da-DK')}
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Uger i alt:</span>
                                    <span className="value">{board.weeksTotal}</span>
                                </div>
                                {board.status === 'active' && (
                                    <div className="info-row highlight">
                                        <span className="label">Tilbageværende:</span>
                                        <span className="value">{board.weeksRemaining} uger</span>
                                    </div>
                                )}
                                <div className="info-row">
                                    <span className="label">Pris per uge:</span>
                                    <span className="value">{board.pricePerWeek} DKK</span>
                                </div>
                                <div className="info-row total">
                                    <span className="label">Total:</span>
                                    <span className="value">{board.totalPrice} DKK</span>
                                </div>
                            </div>

                            <div className="board-actions">
                                {board.status === 'active' && board.weeksRemaining > 1 && (
                                    <button
                                        className="cancel-btn"
                                        onClick={() => handleCancelFutureWeeks(board.id, board.numbers)}
                                    >
                                        🗑️ Annuller fremtidige uger
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-boards">
                    <span className="no-boards-icon">🎲</span>
                    <h2>
                        {filter === 'active' ? 'Ingen aktive plader' : 'Ingen afsluttede plader'}
                    </h2>
                    <p>
                        {filter === 'active'
                            ? 'Køb et nyt spillebræt for at komme i gang!'
                            : 'Dine afsluttede plader vises her når de er færdige.'}
                    </p>
                    {filter === 'active' && (
                        <button
                            className="new-board-btn"
                            onClick={() => navigate('/user/new-board')}
                        >
                            🎲 Køb nyt bræt
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}