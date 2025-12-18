import { useFetchBoards } from '../ViewBoards/useFetchBoards.ts';
import './showWinningPeople.css';
import { useFetchGames } from './useFetchGames';
import {contains3Numbers} from "../../../../utils/CalculateWinningBoard.ts";


export default function ShowWinningPeople() {
    const { games, loading: gamesLoading, error: gamesError } = useFetchGames();
    const { boards, loading: boardsLoading, error: boardsError } = useFetchBoards();

    console.log('Games:', games);
    console.log('Boards:', boards);

    const currentGame = games;

    if (!currentGame || !currentGame.winningNumbers || currentGame.winningNumbers.length === 0) {
        return (
            <div className="show-winning-people-container">
                <button className="floating-profile-btn">
                    👤
                </button>
                <div className="show-winning-people-content">
                    <header className="winners-header">
                        <h1 className="page-title">Ugens Vindere</h1>
                        <p className="page-subtitle">Ingen afsluttet spil endnu</p>
                    </header>
                    {(gamesLoading || boardsLoading) && <p>Henter data...</p>}
                    {gamesError && <p className="error-message">Fejl ved hentning af spil: {gamesError}</p>}
                    {boardsError && <p className="error-message">Fejl ved hentning af plader: {boardsError}</p>}
                </div>
            </div>
        );
    }

    const winningNumbers = currentGame.winningNumbers;
    
    //const boardsLinkedToGame = boards.filter(b => b.games.some(g => g.id === currentGame.id));
    //console.log('Boards linked to current game:', /*boardsLinkedToGame*/);
    // ville dette ikke altid være false da hver nummer skal være i listen - da der skal være 5 numre? huh?
    /*const winners = boards.filter(b => {
        if (!b.numbers || b.numbers.length === 0) return false;
        console.log(winningNumbers);
        return b.numbers.every(num => winningNumbers.includes(num));
    });*/
    const winners = boards.filter(b => contains3Numbers(b.numbers, winningNumbers));

    console.log('Winners:', winners);

    return (
        <div className="show-winning-people-container">

            <div className="show-winning-people-content">
                {/* Header */}
                <header className="winners-header">
                    <h1 className="page-title">Ugens Vindere</h1>
                    <p className="page-subtitle">Tillykke til alle vinderne! 🎉</p>
                </header>

                {(gamesLoading /*|| boardsLoading*/) && <p>Henter data...</p>}
                {gamesError && <p className="error-message">Fejl ved hentning af spil: {gamesError}</p>}
                {boardsError && <p className="error-message">Fejl ved hentning af plader: {boardsError}</p>}

                {/* Vindernumre sektion */}
                <section className="winning-numbers-section">
                    <h2 className="section-title">Vindernumre</h2>
                    <div className="winning-numbers-display">
                        {winningNumbers.map((number, index) => (
                            <div key={index} className="winning-number-ball">
                                {number}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Vindere liste */}
                <section className="winners-list-section">
                    <h2 className="section-title">Vindere ({winners.length})</h2>

                    {winners.length === 0 ? (
                        <p>Ingen vindere denne uge.</p>
                    ) : (
                        <div className="winners-grid">
                            {winners.map((winner) => (
                                <div key={winner.id} className="winner-card">
                                    <div className="winner-header">
                                        <div className="winner-icon">🏆</div>
                                        <div className="winner-info">
                                            <h3 className="winner-name">{winner.playerName || 'Ukendt spiller'}</h3>
                                            <p className="winner-board-id">Plade ID: {winner.id}</p>
                                        </div>
                                    </div>

                                    <div className="winner-numbers">
                                        <p className="numbers-label">Valgte numre:</p>
                                        <div className="numbers-display">
                                            {winner.numbers?.map((num, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`number-chip ${winningNumbers.includes(num) ? 'winning' : ''}`}
                                                >
                                                    {num}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}