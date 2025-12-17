import './gameHistory.css';
import {useFetchGames, type WinningBoard} from "./fetchGames.ts";
import {useGameInformation} from "./useGameInformation.ts";

export default function GameHistory() {
    // SLET LINJE 23-57 NÅR BACKEND ER CONNECTED
    const games = useFetchGames();

    const {
        expandedGame,
        setExpandedGame,
    } = useGameInformation();

    // SLET LINJE 62-75 NÅR BACKEND ER CONNECTED
    const getWinningBoards = async (gameId: string): Promise<WinningBoard[]> => {
        if (gameId != null) {
            return await getWinningBoards(gameId);
        }
        return [];
    };

    const toggleGameDetails = (gameId: string) => {
        setExpandedGame(expandedGame === gameId ? null : gameId);
    };

    return (
        <div className="game-history-container">
            <div className="history-header">
                <div>
                    <h1>Spilhistorik</h1>
                    <p className="subtitle">Oversigt over alle afsluttede spil</p>
                </div>
                <div className="stats-summary">
                    <div className="stat-item">
                        <span className="stat-label">Total spil</span>
                        <span className="stat-value">{games.length}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Total omsætning</span>
                        <span className="stat-value">
                            {games.reduce((sum, g) => sum + g.totalRevenue, 0)} DKK
                        </span>
                    </div>
                </div>
            </div>

            <div className="games-list">
                {games.map((game) => {
                    const winningBoards = getWinningBoards(game.id);
                    const isExpanded = expandedGame === game.id;

                    return (
                        <div key={game.id} className="game-card">
                            <div className="game-main" onClick={() => toggleGameDetails(game.id)}>
                                <div className="game-info">
                                    <h3 className="game-week">{game.weekNumber}</h3>
                                    <span className="game-date">
                                        {new Date(game.drawDate).toLocaleDateString('da-DK', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>

                                <div className="winning-numbers-display">
                                    <span className="numbers-label">Vindernumre:</span>
                                    <div className="winning-numbers">
                                        {game.winningNumbers.map(num => (
                                            <span key={num} className="winning-num">{num}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="game-stats">
                                    <div className="stat-box">
                                        <span className="stat-number">{game.totalBoards}</span>
                                        <span className="stat-text">Brætter</span>
                                    </div>
                                    <div className="stat-box winning">
                                        <span className="stat-number">{game.winningBoards}</span>
                                        <span className="stat-text">Vindere</span>
                                    </div>
                                    <div className="stat-box">
                                        <span className="stat-number">{game.totalRevenue} DKK</span>
                                        <span className="stat-text">Omsætning</span>
                                    </div>
                                </div>

                                <button className="expand-btn" type="button">
                                    {isExpanded ? '▼' : '▶'}
                                </button>
                            </div>

                            {isExpanded && (
                                <div className="game-details">
                                    <h4>Vindende spillebrætter</h4>
                                    {winningBoards.length > 0 ? (
                                        <div className="winning-boards-list">
                                            {winningBoards.map((board, idx) => (
                                                <div key={idx} className="winning-board-item">
                                                    <div className="board-player">
                                                        <span className="trophy">🏆</span>
                                                        <span className="player-name">{board.playerName}</span>
                                                    </div>
                                                    <div className="board-numbers">
                                                        {board.numbers.map(num => (
                                                            <span
                                                                key={num}
                                                                className={`board-num ${game.winningNumbers.includes(num) ? 'match' : ''}`}
                                                            >
                                                                {num}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="board-price">
                                                        {board.pricePerWeek} DKK/uge
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="prize-calculation">
                                                <strong>Beregning:</strong>
                                                <p>Præmiepulje: {game.prizePool} DKK ÷ {winningBoards.length} vindere = <strong>{Math.round(game.prizePool / winningBoards.length)} DKK per vinder</strong></p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="no-winners">
                                            <span className="no-winners-icon">🎲</span>
                                            <p>Ingen vindere denne uge</p>
                                            <p className="no-winners-note">Præmiepuljen på {game.prizePool} DKK overføres til næste uge</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}