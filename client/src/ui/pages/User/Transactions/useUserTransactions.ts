import {useEffect, useState} from 'react';
import {transactionClient} from "../../../../core/api-clients.ts";
import type {BaseTransactionResponse} from "../../../../core/ServerAPI.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";

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

    // SLET DENNE DATA NÅR BACKEND ER CONNECTED ; ordenligt - for der skal lige findes en bedre løsning med pagination
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        getTransactions().then(res => setTransactions(res))
    }, []);

    // filtrerer på den nuværende liste ig
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


async function getTransactions(){
    const model = SieveQueryBuilder.create<BaseTransactionResponse>().sortByDescending("created").buildSieveModel();
    const res = await transactionClient.getUserTransactions(model);
    return res.map(transaction => {
        return mapToTransactionType(transaction);
    });
}

function mapToTransactionType(t: BaseTransactionResponse): Transaction{
    return {
        id: t.id,
        amount: t.amount,
        mobilePayId: t.mobilePayId,
        timestamp: t.created,
        status: t.status == 0 ? 'pending' : t.status == 1 ? 'approved' : 'rejected',
    };
}