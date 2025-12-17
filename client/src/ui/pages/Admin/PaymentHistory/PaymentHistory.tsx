import "./PatmenstHistory.css"
import {useFetchPayments} from "./useFetchPayments.ts";

export default function PaymentHistory() {
    const intake = 20;
    const {
        payments,
        allTransactionsNumber,
        page,
        setPage,
    } = useFetchPayments()
    return (
        <div className="view-players-container">
            <div className="players-header">
                <div>
                    <h1>Betalinger</h1>
                    <p className="subtitle">Se alle betalinger i systemet</p>
                </div>
                <div className="header-stats">
                    <div className="stat-box">
                        <span className="stat-label">Total</span>
                        <span className="stat-value">{allTransactionsNumber}</span>
                    </div>
                    {/*<div className="stat-box active">
                        <span className="stat-label">Aktive</span>
                        <span className="stat-value">{activeUsers}</span>
                    </div>*/}
                </div>
            </div>

            {/* Filter buttons */}
            {/*
            <div className="filter-bar">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => {setFilter('all'); setPage(1)}}
                >
                    Alle
                </button>
                <button
                    className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => {setFilter('active'); setPage(1)}}
                >
                    Aktive
                </button>
                <button
                    className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
                    onClick={() => {setFilter('inactive'); setPage(1)}}
                >
                    Inaktive
                </button>
            </div>*/}

            {/* Players table */}
            <div className="players-table">
                <table>
                    <thead>
                    <tr>
                        <th>Navn</th>
                        <th>Telefon</th>
                        <th>MobilePay ID</th>
                        <th>Beløb</th>
                        <th>Status</th>
                        <th>Oprettet</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map(transaction => (
                        <tr key={transaction.id}>
                            <td className="player-name">{transaction.user?.fullName}</td>
                            <td>{transaction.user?.phoneNumber}</td>
                            <td>{transaction.mobilePayId}</td>
                            <td className="balance">{transaction.amount} DKK</td>
                            <td>
                  <span className={`status-badge ${transaction.status === 1 ? 'active' : 'inactive'}`}>
                    {transaction.status === 1 ? 'Accepteret' : transaction.status === 2 ? 'Afvist' : 'Pending'}
                  </span>
                            </td>
                            <td>{new Date(transaction.created != null ? transaction.created.toString() : "").toLocaleDateString('da-DK')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {allTransactionsNumber/intake > 1 && (
                <div className="pagination">
                    <button
                        className="page-btn"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        ← Forrige
                    </button>
                    {
                        <span className="page-info">
                                Side {page} af {Math.ceil(allTransactionsNumber / intake)}
                            </span>}
                    <button
                        className="page-btn"
                        onClick={() => setPage(page + 1)}
                        disabled={page === Math.ceil(allTransactionsNumber / intake) || payments.length != intake}
                    >
                        Næste →
                    </button>
                </div>)}
        </div>
    );
}