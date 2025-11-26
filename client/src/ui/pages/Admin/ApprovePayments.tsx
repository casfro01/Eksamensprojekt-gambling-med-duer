import { useState } from 'react';
import './approvePayments.css';

interface Payment {
    id: string;
    playerName: string;
    amount: number;
    mobilePayId: string;
    timestamp: string;
    status: 'pending' | 'approved' | 'rejected';
}

export default function ApprovePayments() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    // SLET DENNE DATA NÅR BACKEND ER CONNECTED
    const [payments, setPayments] = useState<Payment[]>([
        {
            id: '1',
            playerName: 'Peter Jensen',
            amount: 100,
            mobilePayId: '12345678901',
            timestamp: '2025-11-26 14:23',
            status: 'pending'
        },
        {
            id: '2',
            playerName: 'Anna Nielsen',
            amount: 200,
            mobilePayId: '98765432109',
            timestamp: '2025-11-26 13:15',
            status: 'pending'
        },
        {
            id: '3',
            playerName: 'Lars Larsen',
            amount: 50,
            mobilePayId: '11122233344',
            timestamp: '2025-11-26 12:45',
            status: 'pending'
        },
        {
            id: '4',
            playerName: 'Maria Andersen',
            amount: 500,
            mobilePayId: '55566677788',
            timestamp: '2025-11-26 11:30',
            status: 'pending'
        },
        {
            id: '5',
            playerName: 'Jens Olsen',
            amount: 150,
            mobilePayId: '99988877766',
            timestamp: '2025-11-26 10:20',
            status: 'pending'
        },
        {
            id: '6',
            playerName: 'Sophie Hansen',
            amount: 300,
            mobilePayId: '12312312312',
            timestamp: '2025-11-26 09:15',
            status: 'pending'
        },
        {
            id: '7',
            playerName: 'Thomas Berg',
            amount: 75,
            mobilePayId: '45645645645',
            timestamp: '2025-11-26 08:50',
            status: 'pending'
        },
        {
            id: '8',
            playerName: 'Emma Kristensen',
            amount: 250,
            mobilePayId: '78978978978',
            timestamp: '2025-11-26 08:30',
            status: 'pending'
        },
        {
            id: '9',
            playerName: 'Mikkel Sørensen',
            amount: 400,
            mobilePayId: '32132132132',
            timestamp: '2025-11-26 07:45',
            status: 'pending'
        },
        {
            id: '10',
            playerName: 'Julie Pedersen',
            amount: 180,
            mobilePayId: '65465465465',
            timestamp: '2025-11-26 07:20',
            status: 'pending'
        },
        {
            id: '11',
            playerName: 'Martin Nielsen',
            amount: 220,
            mobilePayId: '14725836901',
            timestamp: '2025-11-25 18:30',
            status: 'pending'
        },
        {
            id: '12',
            playerName: 'Sofie Madsen',
            amount: 90,
            mobilePayId: '36925814701',
            timestamp: '2025-11-25 17:15',
            status: 'pending'
        }
    ]);

    const handleApprove = (id: string) => {
        setPayments(payments.map(p =>
            p.id === id ? { ...p, status: 'approved' } : p
        ));
        console.log('Godkendt betaling:', id);
        // Send til backend senere
        alert('Betaling godkendt!');
    };

    const handleReject = (id: string) => {
        setPayments(payments.map(p =>
            p.id === id ? { ...p, status: 'rejected' } : p
        ));
        console.log('Afvist betaling:', id);
        // Send til backend senere
        alert('Betaling afvist!');
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
                                        <h3>{payment.playerName}</h3>
                                        <span className="timestamp">{payment.timestamp}</span>
                                    </div>
                                    <div className="payment-details">
                                        <div className="detail-row">
                                            <span className="label">Beløb:</span>
                                            <span className="value amount">{payment.amount} DKK</span>
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
                                        onClick={() => handleApprove(payment.id)}
                                    >
                                        ✓ Godkend
                                    </button>
                                    <button
                                        className="reject-btn"
                                        onClick={() => handleReject(payment.id)}
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