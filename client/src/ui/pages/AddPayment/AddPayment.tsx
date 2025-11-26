import { useState } from 'react';
import { useNavigate } from 'react-router';
import './addPayment.css';

export default function AddPayment() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState<string>('');
    const [mobilePayId, setMobilePayId] = useState<string>('');
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    

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

        alert(`Indbetaling af ${amountNum} DKK er registreret!\n\nMobilePay ID: ${mobilePayId}\n\nDine penge vil være tilgængelige om få minutter.`);

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
                            className={amount ? (parseFloat(amount) >= 10 ? 'valid' : 'invalid') : ''}
                        />
                        <span className="hint">Minimum 10 DKK</span>
                    </div>

                    <div className="form-group">
                        <div className="label-with-help">
                            <label htmlFor="mobilePayId">MobilePay Transaktions-ID *</label>
                            <button
                                type="button"
                                className="help-btn"
                                onClick={() => setShowTooltip(!showTooltip)}
                            >
                                ?
                            </button>
                        </div>
                        <input
                            id="mobilePayId"
                            type="text"
                            required
                            value={mobilePayId}
                            onChange={(e) => setMobilePayId(e.target.value)}
                            placeholder="f.eks. 12345678901"
                            pattern="[0-9]{11}"
                            maxLength={11}
                            className={mobilePayId ? (mobilePayId.length === 11 && /^[0-9]{11}$/.test(mobilePayId) ? 'valid' : 'invalid') : ''}
                        />
                        <span className="hint">11-cifret transaktions-ID</span>
                    </div>

                    {showTooltip && (
                        <div className="tooltip-box">
                            <button
                                type="button"
                                className="tooltip-close"
                                onClick={() => setShowTooltip(false)}
                            >
                                ✕
                            </button>
                            <strong>💡 Sådan finder du MobilePay Transaktions-ID:</strong>
                            <ol>
                                <li>Åbn MobilePay appen</li>
                                <li>Find din overførsel under "Aktiviteter"</li>
                                <li>Tryk på overførslen</li>
                                <li>Transaktions-ID'et vises nederst under "Transaktion" (11 cifre)</li>
                                <li>Indtast dette ID her på siden</li>
                            </ol>
                        </div>
                    )}

                    <div className="info-box">
                        <strong>💳 Sådan fungerer det:</strong>
                        <ol>
                            <li>Overfør beløb på MobilePay til: 28 44 29 23</li>
                            <li>Indtast det beløb du overførte på MobilePay</li>
                            <li>Indtast MobilePay transaktions-ID på overførslen her på siden</li>
                        </ol>
                    </div>

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

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={!amount || parseFloat(amount) < 10 || !mobilePayId || mobilePayId.length !== 11}
                    >
                        💰 Indbetal {amount ? `${parseFloat(amount)} DKK` : ''}
                    </button>
                </form>
            </div>
        </div>
    );
}