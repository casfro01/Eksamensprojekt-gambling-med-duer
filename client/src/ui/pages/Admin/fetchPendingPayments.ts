import type {Payment} from "./ApprovePayments.tsx";
import {useState, useEffect} from "react";
import {transactionClient} from "../../../core/api-clients.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";
import type {BaseTransactionResponse, PaymentStatus} from "../../../core/ServerAPI.ts";

export const useFetchPendingPayments = (itemsPerPage: number) => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    useEffect(() => {
        async function fetchPendingPayments() {
            const query = SieveQueryBuilder.create<BaseTransactionResponse>()
                .filterContains("status", 0)
                .pageSize(itemsPerPage)
                .page(currentPage)
                .buildSieveModel();
            const dbPayments: BaseTransactionResponse[] = await transactionClient.getTransactions(query);
            const mappedPayments: Payment[] = dbPayments.map(tx => mapToPaymentType(tx));
            setPayments(mappedPayments);
        }
      fetchPendingPayments().then(() => {});
    }, [currentPage]);

    return{
        payments,
        currentPage,
        setCurrentPage
    }
}

function mapToPaymentType(tx: BaseTransactionResponse): Payment{
    return {
        id: tx.id,
        fullName: tx.email,
        amount: tx.amount,
        mobilePayId: tx.mobilePayId,
        timestamp: tx.created,
        status: statusMap[tx.status]
    }
}

const statusMap: Record<PaymentStatus, string> = {
    0: "pending",
    1: "approved",
    2: "rejected",
};