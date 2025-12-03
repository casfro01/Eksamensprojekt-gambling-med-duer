import './approvePayments.css';
import {useFetchPendingPayments} from "./fetchPendingPayments.ts";
import {approvePayments} from "./ApprovePayment.ts";

export type statusType = 'pending' | 'approved' | 'rejected';
export interface Payment {
    id: string;
    fullName: string;
    amount: number;
    mobilePayId: string;
    timestamp: string;
    status: statusType;
    phoneNumber: string;
}

export default function ApprovePayments() {
    const itemsPerPage = 10;
    const {
        payments,
        setPayments,
        currentPage,
        setCurrentPage
    } = useFetchPendingPayments(itemsPerPage);

    const handleApprove = async (id: string) => {
        setPayments(payments.map(p =>
            p.id === id ? { ...p, status: 'approved' } : p
        ));
        const ans = await approvePayments(id, 1);
        console.log('Godkendt betaling:', id);
        // Send til backend senere
        alert(ans + ': ' + 'Betaling godkendt!');
    };

    const handleReject = async (id: string) => {
        setPayments(payments.map(p =>
            p.id === id ? { ...p, status: 'rejected' } : p
        ));
        const ans = await approvePayments(id, 2);
        console.log('Afvist betaling:', id);
        // Send til backend senere
        alert(ans + ': ' + 'Betaling afvist!');
    };

    // Filter pending payments
    const pendingPayments = payments.filter(p => p.status === 'pending');

    // Pagination
    const totalPages = Math.ceil(pendingPayments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPayments = pendingPayments.slice(startIndex, endIndex);

    return (
        <div className="approve-payments-container">
            <div className="payments-header">
                <div>
                    <h1>Godkend Indbetalinger</h1>
                    <p className="subtitle">Afventende indbetalinger: {pendingPayments.length}</p>
                </div>
            </div>

            {currentPayments.length > 0 ? (
                <>
                    <div className="payments-list">
                        {currentPayments.map((payment) => (
                            <div key={payment.id} className="payment-card">
                                <div className="payment-info">
                                    <div className="player-section">
                                        <h3>{payment.fullName}</h3>
                                        <span className="timestamp">{payment.timestamp}</span>
                                    </div>
                                    <div className="payment-details">
                                        <div className="detail-row">
                                            <span className="label">Beløb:</span>
                                            <span className="value amount">{payment.amount} DKK</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">Telefonnummer:</span>
                                            <span className="value">{payment.phoneNumber}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="label">MobilePay ID:</span>
                                            <span className="value">{payment.mobilePayId}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment-actions">
                                    <button
                                        className="approve-btn"
                                        onClick={async () => handleApprove(payment.id)}
                                    >
                                        ✓ Godkend
                                    </button>
                                    <button
                                        className="reject-btn"
                                        onClick={async () => handleReject(payment.id)}
                                    >
                                        ✕ Afvis
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="page-btn"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ← Forrige
                            </button>
                            <span className="page-info">
                                Side {currentPage} af {totalPages}
                            </span>
                            <button
                                className="page-btn"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Næste →
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="no-payments">
                    <span className="no-payments-icon">✓</span>
                    <h2>Ingen afventende indbetalinger</h2>
                    <p>Alle indbetalinger er blevet behandlet</p>
                </div>
            )}
        </div>
    );
}