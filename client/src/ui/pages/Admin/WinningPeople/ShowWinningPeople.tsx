import './showWinningPeople.css';

// Dummy data


export default function ShowWinningPeople() {

    const WINNING_NUMBERS = [3, 7, 12];

    const DUMMY_WINNERS = [
        {
            id: 1,
            name: "Anders Hansen",
            selectedNumbers: [2, 3, 7, 11, 12],
            prize: 450
        },
        {
            id: 2,
            name: "Marie Nielsen",
            selectedNumbers: [3, 7, 9, 12, 15],
            prize: 450
        },
        {
            id: 3,
            name: "Peter Jensen",
            selectedNumbers: [1, 3, 7, 12, 14, 16],
            prize: 450
        }
    ];
    
    return (
        <div className="show-winning-people-container">
            {/* Floating profil knap */}
            <button className="floating-profile-btn">
                👤
            </button>

            <div className="show-winning-people-content">
                {/* Header */}
                <header className="winners-header">
                    <h1 className="page-title">Ugens Vindere</h1>
                    <p className="page-subtitle">Tillykke til alle vinderne! 🎉</p>
                </header>

                {/* Vindernumre sektion */}
                <section className="winning-numbers-section">
                    <h2 className="section-title">Vindernumre</h2>
                    <div className="winning-numbers-display">
                        {WINNING_NUMBERS.map((number, index) => (
                            <div key={index} className="winning-number-ball">
                                {number}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Vindere liste */}
                <section className="winners-list-section">
                    <h2 className="section-title">Vindere ({DUMMY_WINNERS.length})</h2>

                    <div className="winners-grid">
                        {DUMMY_WINNERS.map((winner) => (
                            <div key={winner.id} className="winner-card">
                                <div className="winner-header">
                                    <div className="winner-icon">🏆</div>
                                    <div className="winner-info">
                                        <h3 className="winner-name">{winner.name}</h3>
                                        <p className="winner-prize">{winner.prize} DKK</p>
                                    </div>
                                </div>

                                <div className="winner-numbers">
                                    <p className="numbers-label">Valgte numre:</p>
                                    <div className="numbers-display">
                                        {winner.selectedNumbers.map((num, idx) => (
                                            <span
                                                key={idx}
                                                className={`number-chip ${WINNING_NUMBERS.includes(num) ? 'winning' : ''}`}
                                            >
                        {num}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}