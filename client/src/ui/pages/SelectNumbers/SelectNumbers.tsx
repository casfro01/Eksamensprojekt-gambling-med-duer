import './selectNumbers.css';
import { useSelectNumbers } from './useSelectNumbers';
import ProfileButton from '../../components/ProfileButton';
import { handleSubmit } from './handleSubmit';
import AddPaymentButton from '../../components/AddPaymentButton';

export default function SelectNumbers() {
    const {
        selectedNumbers,
        numberOfWeeks,
        setNumberOfWeeks,
        toggleNumber,
        clearSelection,
        calculatePricePerWeek,
        calculateTotalPrice,
        canSubmit
    } = useSelectNumbers();

    const onSubmit = () => {
        handleSubmit(selectedNumbers, numberOfWeeks, calculatePricePerWeek, calculateTotalPrice, canSubmit);
    };

    return (
        <div className="selectnumbers-container">
            <ProfileButton />
            <AddPaymentButton />
            <div className="selectnumbers-content">
                <header className="selectnumbers-header">
                    <h1>Vælg dine numre</h1>
                    <p>Vælg mellem 5-8 numre fra 1-16</p>
                </header>

                <div className="info-bar">
                    <div className="info-item">
                        <span className="info-label">Valgte tal:</span>
                        <span className="info-value">{selectedNumbers.length}/8</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Pris denne uge:</span>
                        <span className="info-value highlight">{calculatePricePerWeek()} DKK</span>
                    </div>
                </div>

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

                {canSubmit() && numberOfWeeks > 1 && (
                    <div className="payment-info-box">
                        <div className="payment-icon">ℹ️</div>
                        <div className="payment-text">
                            <strong>Automatisk betaling:</strong>
                            <p>Du betaler {calculatePricePerWeek()} DKK nu. Derefter trækkes {calculatePricePerWeek()} DKK ugentligt i {numberOfWeeks - 1} {numberOfWeeks - 1 === 1 ? 'uge' : 'uger'} mere.</p>
                            <p className="total-cost">Samlet beløb: {calculateTotalPrice()} DKK</p>
                        </div>
                    </div>
                )}

                {canSubmit() && (
                    <div className="price-breakdown">
                        <div className="price-row">
                            <span>Betaling nu:</span>
                            <span className="highlight-price">{calculatePricePerWeek()} DKK</span>
                        </div>
                        {numberOfWeeks > 1 && (
                            <>
                                <div className="price-row">
                                    <span>Ugentlig betaling:</span>
                                    <span>{calculatePricePerWeek()} DKK</span>
                                </div>
                                <div className="price-row">
                                    <span>Antal uger i alt:</span>
                                    <span>{numberOfWeeks}</span>
                                </div>
                                <div className="price-row total">
                                    <span>Samlet over {numberOfWeeks} uger:</span>
                                    <span>{calculateTotalPrice()} DKK</span>
                                </div>
                            </>
                        )}
                    </div>
                )}

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
                        onClick={onSubmit}
                        disabled={!canSubmit()}
                    >
                        Køb spillebræt ({calculatePricePerWeek()} DKK)
                    </button>
                </div>

                {selectedNumbers.length > 0 && selectedNumbers.length < 5 && (
                    <div className="warning-message">
                        ⚠️ Du skal vælge mindst 5 tal for at kunne spille
                    </div>
                )}
            </div>
        </div>
    );
}