import { useState } from 'react';
import './viewBoards.css';

interface Board {
    id: string;
    playerName: string;
    numbers: number[];
    weeks: number;
    pricePerWeek: number;
    totalPrice: number;
    createdDate: string;
    isWinning: boolean;
}

export default function ViewBoards() {
    const [boards] = useState<Board[]>([
        {
            id: '1',
            playerName: 'Peter Jensen',
            numbers: [1, 5, 7, 12, 15],
            weeks: 3,
            pricePerWeek: 20,
            totalPrice: 60,
            createdDate: '2025-01-20',
            isWinning: false
        },
        {
            id: '2',
            playerName: 'Anna Nielsen',
            numbers: [2, 4, 8, 10, 13, 14, 16],
            weeks: 1,
            pricePerWeek: 80,
            totalPrice: 80,
            createdDate: '2025-01-21',
            isWinning: true
        }
    ]);

    const [currentWeekWinningNumbers] = useState<number[]>([2, 8, 13]);

    return (
        <div className="view-boards-container">
            <div className="boards-header">
                <div>
                    <h1>Spillebrætter</h1>
                    <p className="subtitle">Oversigt over alle aktive spillebrætter</p>
                </div>
                <div className="winning-numbers-display">
                    <span className="label">Denne uges vindernumre:</span>
                    <div className="winning-numbers">
                        {currentWeekWinningNumbers.map(num => (
                            <span key={num} className="winning-number">{num}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="stats-row">
                <div className="stat-card">
                    <span className="stat-label">Total brætter</span>
                    <span className="stat-value">{boards.length}</span>
                </div>
                <div className="stat-card winning">
                    <span className="stat-label">Vindende brætter</span>
                    <span className="stat-value">{boards.filter(b => b.isWinning).length}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Total omsætning</span>
                    <span className="stat-value">{boards.reduce((sum, b) => sum + b.totalPrice, 0)} DKK</span>
                </div>
            </div>

            <div className="boards-grid">
                {boards.map((board) => (
                    <div key={board.id} className={`board-card ${board.isWinning ? 'winning' : ''}`}>
                        {board.isWinning && <div className="winning-badge">🏆 VINDER!</div>}

                        <div className="board-header">
                            <h3>{board.playerName}</h3>
                            <span className="board-date">
                {new Date(board.createdDate).toLocaleDateString('da-DK')}
              </span>
                        </div>

                        <div className="board-numbers">
                            {board.numbers.map(num => (
                                <span
                                    key={num}
                                    className={`board-number ${currentWeekWinningNumbers.includes(num) ? 'match' : ''}`}
                                >
                  {num}
                </span>
                            ))}
                        </div>

                        <div className="board-info">
                            <div className="info-row">
                                <span>Antal tal:</span>
                                <span className="value">{board.numbers.length}</span>
                            </div>
                            <div className="info-row">
                                <span>Uger:</span>
                                <span className="value">{board.weeks}</span>
                            </div>
                            <div className="info-row">
                                <span>Pris per uge:</span>
                                <span className="value">{board.pricePerWeek} DKK</span>
                            </div>
                            <div className="info-row total">
                                <span>Total:</span>
                                <span className="value">{board.totalPrice} DKK</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}