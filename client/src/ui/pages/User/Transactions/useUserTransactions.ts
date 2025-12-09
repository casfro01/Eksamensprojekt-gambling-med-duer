import { useState } from 'react';

export interface Transaction {
    id: string;
    amount: number;
    mobilePayId: string;
    timestamp: string;
    status: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
}

export type TransactionFilterType = 'all' | 'pending' | 'approved' | 'rejected';

export const useUserTransactions = () => {
    const [filter, setFilter] = useState<TransactionFilterType>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    // SLET DENNE DATA NÅR BACKEND ER CONNECTED
    const [transactions] = useState<Transaction[]>([
        {
            id: '1',
            amount: 100,
            mobilePayId: '12345678901',
            timestamp: '2025-12-08T10:30:00',
            status: 'pending'
        },
        {
            id: '2',
            amount: 200,
            mobilePayId: '98765432109',
            timestamp: '2025-12-07T14:20:00',
            status: 'approved'
        },
        {
            id: '3',
            amount: 50,
            mobilePayId: '11122233344',
            timestamp: '2025-12-06T09:15:00',
            status: 'approved'
        },
        {
            id: '4',
            amount: 150,
            mobilePayId: '55566677788',
            timestamp: '2025-12-05T16:45:00',
            status: 'rejected',
            rejectionReason: 'MobilePay ID matcher ikke overførsel eller dublikeret overførsel'
        }
    ]);

    const filteredTransactions = filter === 'all'
        ? transactions
        : transactions.filter(t => t.status === filter);

    const pendingCount = transactions.filter(t => t.status === 'pending').length;
    const approvedCount = transactions.filter(t => t.status === 'approved').length;
    const rejectedCount = transactions.filter(t => t.status === 'rejected').length;

    // Pagination
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

    return {
        filter,
        setFilter,
        transactions,
        filteredTransactions,
        paginatedTransactions,
        pendingCount,
        approvedCount,
        rejectedCount,
        currentPage,
        setCurrentPage,
        totalPages
    };
};