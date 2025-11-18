import './selectNumbers.css';
import { useSelectNumbers } from './useSelectNumbers';

export default function SelectNumbers() {
    const {
        selectedNumbers,
        numberOfWeeks,
        setNumberOfWeeks,
        toggleNumber,
        clearSelection,
        calculatePrice,
        canSubmit
    } = useSelectNumbers();

    const handleSubmit = () => {
        if (canSubmit()) {
            console.log('Spillebræt:', {
                numbers: selectedNumbers.sort((a, b) => a - b),
                weeks: numberOfWeeks,
                price: calculatePrice()
            });
            // Send data videre til backend (senere)!!!
            alert(`Bræt oprettet! Tal: ${selectedNumbers.sort((a, b) => a - b).join(', ')}`);
        }
    };

    return (
        <div className="selectnumbers-container">
            <div className="selectnumbers-content">
                {/* Header */}
                <header className="selectnumbers-header">
                    <h1>Vælg dine numre</h1>
                    <p>Vælg mellem 5-8 numre fra 1-16</p>
                </header>

                {/* Info bar */}
                <div className="info-bar">
                    <div className="info-item">
                        <span className="info-label">Valgte tal:</span>
                        <span className="info-value">{selectedNumbers.length}/8</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Pris:</span>
                        <span className="info-value highlight">{calculatePrice()} DKK</span>
                    </div>
                </div>

                {/* Number grid */}
                <div className="number-grid">
                    {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            className={`number-button ${selectedNumbers.includes(num) ? 'selected' : ''} ${
                                selectedNumbers.length >= 8 && !selectedNumbers.includes(num) ? 'disabled' : ''
                            }`}
                            onClick={() => toggleNumber(num)}
                            disabled={selectedNumbers.length >= 8 && !selectedNumbers.includes(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>

                {/* Selected numbers display */}
                {selectedNumbers.length > 0 && (
                    <div className="selected-display">
                        <h3>Dine valgte tal:</h3>
                        <div className="selected-numbers">
                            {selectedNumbers.sort((a, b) => a - b).map((num) => (
                                <span key={num} className="selected-number">
                  {num}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Weeks selector */}
                <div className="weeks-section">
                    <label htmlFor="weeks">Antal uger:</label>
                    <div className="weeks-input-group">
                        <button
                            className="week-button"
                            onClick={() => setNumberOfWeeks(Math.max(1, numberOfWeeks - 1))}
                        >
                            -
                        </button>
                        <input
                            id="weeks"
                            type="number"
                            min="1"
                            max="10"
                            value={numberOfWeeks}
                            onChange={(e) => setNumberOfWeeks(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                            className="weeks-input"
                        />
                        <button
                            className="week-button"
                            onClick={() => setNumberOfWeeks(Math.min(10, numberOfWeeks + 1))}
                        >
                            +
                        </button>
                    </div>
                    <p className="weeks-hint">Spil de samme tal i op til 10 uger</p>
                </div>

                {/* Price breakdown */}
                {canSubmit() && (
                    <div className="price-breakdown">
                        <div className="price-row">
                            <span>Pris per uge:</span>
                            <span>{calculatePrice() / numberOfWeeks} DKK</span>
                        </div>
                        <div className="price-row">
                            <span>Antal uger:</span>
                            <span>{numberOfWeeks}</span>
                        </div>
                        <div className="price-row total">
                            <span>Total:</span>
                            <span>{calculatePrice()} DKK</span>
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                <div className="action-buttons">
                    <button
                        className="clear-button"
                        onClick={clearSelection}
                        disabled={selectedNumbers.length === 0}
                    >
                        Ryd valg
                    </button>
                    <button
                        className="submit-button"
                        onClick={handleSubmit}
                        disabled={!canSubmit()}
                    >
                        Køb spillebræt
                    </button>
                </div>

                {/* Warning message */}
                {selectedNumbers.length > 0 && selectedNumbers.length < 5 && (
                    <div className="warning-message">
                        ⚠️ Du skal vælge mindst 5 tal for at kunne spille
                    </div>
                )}
            </div>
        </div>
    );
}