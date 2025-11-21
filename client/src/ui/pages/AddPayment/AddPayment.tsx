import { useState } from 'react';
import { useNavigate } from 'react-router';
import './addPayment.css';

export default function AddPayment() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState<string>('');
    const [mobilePayId, setMobilePayId] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const amountNum = parseFloat(amount);

        if (amountNum < 10) {
            alert('Minimumsbeløb er 10 DKK');
            return;
        }

        console.log('Indbetaling:', {
            amount: amountNum,
            mobilePayId: mobilePayId
        });

        // Send til backend senere
        alert(`Indbetaling af ${amountNum} DKK er registreret!\n\nMobilePay ID: ${mobilePayId}\n\nDine penge vil være tilgængelige om få minutter.`);

        // Naviger tilbage
        navigate(-1);
    };

    const quickAmounts = [50, 100, 200, 500];

    return (
        <div className="add-payment-container">
            <div className="payment-content">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Tilbage
                </button>

                <h1>Indsæt Penge</h1>
                <p className="subtitle">Tilføj penge til din konto via MobilePay</p>

                <form onSubmit={handleSubmit} className="payment-form">
                    {/* Quick amount buttons */}
                    <div className="quick-amounts">
                        <span className="quick-label">Hurtigvalg:</span>
                        <div className="quick-buttons">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    type="button"
                                    className="quick-btn"
                                    onClick={() => setAmount(amt.toString())}
                                >
                                    {amt} DKK
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amount input */}
                    <div className="form-group">
                        <label htmlFor="amount">Beløb (DKK) *</label>
                        <input
                            id="amount"
                            type="number"
                            required
                            min="10"
                            step="1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="f.eks. 100"
                        />
                        <span className="hint">Minimum 10 DKK</span>
                    </div>

                    {/* MobilePay ID */}
                    <div className="form-group">
                        <label htmlFor="mobilePayId">MobilePay ID *</label>
                        <input
                            id="mobilePayId"
                            type="tel"
                            required
                            value={mobilePayId}
                            onChange={(e) => setMobilePayId(e.target.value)}
                            placeholder="f.eks. 12345678"
                            pattern="[0-9]{8}"
                            maxLength={8}
                        />
                        <span className="hint">Dit 8-cifrede telefonnummer</span>
                    </div>

                    {/* Info box */}
                    <div className="info-box">
                        <strong>💳 Sådan fungerer det:</strong>
                        <ol>
                            <li>Indtast det beløb du vil indsætte</li>
                            <li>Indtast dit MobilePay telefonnummer</li>
                            <li>Tryk "Indbetal" og godkend i MobilePay appen</li>
                            <li>Pengene er tilgængelige på din konto med det samme</li>
                        </ol>
                    </div>

                    {/* Preview */}
                    {amount && parseFloat(amount) >= 10 && (
                        <div className="payment-preview">
                            <h3>Oversigt</h3>
                            <div className="preview-row">
                                <span>Beløb:</span>
                                <span className="preview-amount">{parseFloat(amount).toFixed(2)} DKK</span>
                            </div>
                            <div className="preview-row">
                                <span>MobilePay ID:</span>
                                <span>{mobilePayId || '—'}</span>
                            </div>
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={!amount || parseFloat(amount) < 10 || !mobilePayId}
                    >
                        💰 Indbetal {amount ? `${parseFloat(amount)} DKK` : ''}
                    </button>
                </form>
            </div>
        </div>
    );
}