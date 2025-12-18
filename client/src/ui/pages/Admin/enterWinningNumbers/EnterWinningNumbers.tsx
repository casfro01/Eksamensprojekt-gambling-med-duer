import {useSetWinningNumbers, setWinningNumbers} from './useSetWinningNumbers';
import './enterWinningNumbers.css';
import {useNavigate} from "react-router";


export default function EnterWinningNumbers() {
    const {
        selectedNumbers,
        setSelectedNumbers,
        currentWeek,
        setCurrentWeek,
        drawDate,
        setDrawDate
    } = useSetWinningNumbers();
    
    const navigate = useNavigate();

    const toggleNumber = (num: number) => {
        if (selectedNumbers.includes(num)) {
            setSelectedNumbers(selectedNumbers.filter(n => n !== num));
        } else {
            if (selectedNumbers.length < 3) {
                setSelectedNumbers([...selectedNumbers, num]);
            }
        }
    };

    const clearSelection = () => {
        setSelectedNumbers([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedNumbers.length !== 3) {
            alert('Du skal vælge præcis 3 vindernumre!');
            return;
        }

        console.log('Vindernumre:', {
            numbers: selectedNumbers.sort((a, b) => a - b),
            week: currentWeek,
            date: drawDate
        });

        await setWinningNumbers(selectedNumbers);

        // Send til backend senere
        alert(`Vindernumre indsat!\n\nNumre: ${selectedNumbers.sort((a, b) => a - b).join(', ')}\nUge: ${currentWeek}\nDato: ${drawDate}`);

        // Reset form
        setSelectedNumbers([]);
        setCurrentWeek('');

        // Navigate til showwinningpeople
        navigate('show-winning-people');
    };

    return (
        <div className="winning-numbers-container">
            <h1>Indtast Vindernumre</h1>
            <p className="subtitle">Vælg de 3 vindernumre for denne uge</p>

            <form onSubmit={async event => {await handleSubmit(event)}} className="winning-form">
                {/* Week info */}
                <div className="info-section">
                    <div className="form-group">
                        <label htmlFor="week">Uge nummer</label>
                        <input
                            id="week"
                            type="text"
                            required
                            value={currentWeek}
                            onChange={(e) => setCurrentWeek(e.target.value)}
                            placeholder="f.eks. Uge 47"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Trækningsdato</label>
                        <input
                            id="date"
                            type="date"
                            required
                            value={drawDate}
                            onChange={(e) => setDrawDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Selection status */}
                <div className="selection-status">
                    <span className="status-label">Valgte vindernumre:</span>
                    <span className="status-count">
            {selectedNumbers.length}/3
          </span>
                </div>

                {/* Number grid */}
                <div className="numbers-grid">
                    {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            type="button"
                            className={`number-btn ${selectedNumbers.includes(num) ? 'selected' : ''} ${
                                selectedNumbers.length >= 3 && !selectedNumbers.includes(num) ? 'disabled' : ''
                            }`}
                            onClick={() => toggleNumber(num)}
                            disabled={selectedNumbers.length >= 3 && !selectedNumbers.includes(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>

                {/* Selected numbers display */}
                {selectedNumbers.length > 0 && (
                    <div className="selected-display">
                        <h3>Valgte vindernumre:</h3>
                        <div className="selected-numbers">
                            {selectedNumbers.sort((a, b) => a - b).map((num) => (
                                <span key={num} className="winning-number">
                  {num}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Warning */}
                {selectedNumbers.length > 0 && selectedNumbers.length < 3 && (
                    <div className="warning-box">
                        ⚠️ Du skal vælge præcis 3 numre
                    </div>
                )}

                {/* Action buttons */}
                <div className="action-buttons">
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={clearSelection}
                        disabled={selectedNumbers.length === 0}
                    >
                        Ryd valg
                    </button>
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={selectedNumbers.length !== 3 || !currentWeek}
                    >
                        Gem vindernumre
                    </button>
                </div>

                {/* Info box */}
                <div className="info-box">
                    <strong>💡 Vigtigt:</strong>
                    <p>Efter du har gemt vindernumrene, vil systemet automatisk beregne hvilke spilleplader der har vundet. Husk at rækkefølgen af numrene er ligegyldig.</p>
                </div>
            </form>
        </div>
    );
}