import { useUserTransactions } from './useUserTransactions';
import './userTransactions.css';

export default function UserTransactions() {
    const {
        filter,
        setFilter,
        paginatedTransactions,
        pendingCount,
        approvedCount,
        rejectedCount,
        currentPage,
        setCurrentPage,
        totalPages
    } = useUserTransactions();

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'pending': return '⏳';
            case 'approved': return '✅';
            case 'rejected': return '❌';
            default: return '❓';
        }
    };

    const getStatusText = (status: string) => {
        switch(status) {
            case 'pending': return 'Afventer';
            case 'approved': return 'Godkendt';
            case 'rejected': return 'Afvist';
            default: return 'Ukendt';
        }
    };

    return (
        <div className="user-transactions-container">
            <div className="transactions-header">
                <div>
                    <h1>Transaktionshistorik</h1>
                    <p className="subtitle">Oversigt over alle dine indbetalinger</p>
                </div>
                <div className="stats-summary">
                    <div className="stat-box pending">
                        <span className="stat-label">Afventer</span>
                        <span className="stat-value">{pendingCount}</span>
                    </div>
                    <div className="stat-box approved">
                        <span className="stat-label">Godkendt</span>
                        <span className="stat-value">{approvedCount}</span>
                    </div>
                    <div className="stat-box rejected">
                        <span className="stat-label">Afvist</span>
                        <span className="stat-value">{rejectedCount}</span>
                    </div>
                </div>
            </div>

            <div className="filter-bar">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Alle ({pendingCount + approvedCount + rejectedCount})
                </button>
                <button
                    className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    Afventer ({pendingCount})
                </button>
                <button
                    className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
                    onClick={() => setFilter('approved')}
                >
                    Godkendt ({approvedCount})
                </button>
                <button
                    className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
                    onClick={() => setFilter('rejected')}
                >
                    Afvist ({rejectedCount})
                </button>
            </div>

            {paginatedTransactions.length > 0 ? (
                <>
                    <div className="transactions-list">
                        {paginatedTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className={`transaction-card ${transaction.status}`}
                            >
                                <div className="transaction-status-badge">
                                    {getStatusIcon(transaction.status)} {getStatusText(transaction.status)}
                                </div>

                                <div className="transaction-main">
                                    <div className="transaction-amount">
                                        <span className="amount-value">{transaction.amount} DKK</span>
                                        <span className="transaction-date">
                                            {new Date(transaction.timestamp).toLocaleDateString('da-DK', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>

                                    <div className="transaction-details">
                                        <div className="detail-row">
                                            <span className="label">MobilePay ID:</span>
                                            <span className="value">{transaction.mobilePayId}</span>
                                        </div>
                                        {transaction.status === 'rejected' && transaction.rejectionReason && (
                                            <div className="rejection-reason">
                                                <strong>Årsag til afvisning:</strong> {transaction.rejectionReason}
                                            </div>
                                        )}
                                    </div>
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
                <div className="no-transactions">
                    <span className="no-transactions-icon">💳</span>
                    <h2>Ingen transaktioner</h2>
                    <p>Du har endnu ikke foretaget nogen indbetalinger</p>
                </div>
            )}
        </div>
    );
}