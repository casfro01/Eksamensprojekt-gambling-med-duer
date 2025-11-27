import type {Payment, statusType} from "./ApprovePayments.tsx";
import {useState, useEffect} from "react";
import {transactionClient} from "../../../../core/api-clients.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";
import type {BaseTransactionResponse, PaymentStatus} from "../../../../core/ServerAPI.ts";

export const useFetchPendingPayments = (itemsPerPage: number) => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    console.log(itemsPerPage);
    useEffect(() => {
        async function fetchPendingPayments() {
            const query = SieveQueryBuilder.create<BaseTransactionResponse>()
                .filterContains("status", "0") // dette giver alle idk why, men dette skal ikke være den permanente løsning
                //.filterEquals("status", 0)
                //.pageSize(itemsPerPage)
                //.page(currentPage) - find lige en server side pagination i stedet - da der kan være mange transaktioner
                .buildSieveModel();
            const dbPayments: BaseTransactionResponse[] = await transactionClient.getTransactions(query);
            const mappedPayments: Payment[] = dbPayments.map(tx => mapToPaymentType(tx));
            setPayments(mappedPayments);
        }
      fetchPendingPayments().then(() => {});
    }, [currentPage]);

    return{
        payments,
        setPayments,
        currentPage,
        setCurrentPage
    }
}

function mapToPaymentType(tx: BaseTransactionResponse): Payment{
    return {
        id: tx.id != undefined ? tx.id : "",
        fullName: tx.email != undefined ? tx.email : "",
        amount: tx.amount != undefined ? tx.amount : 0,
        mobilePayId: tx.mobilePayId != undefined ? tx.mobilePayId : "",
        timestamp: tx.created != undefined ? tx.created : "",
        status: statusMap[tx.status != undefined ? tx.status : 0] as statusType,
    }
}

const statusMap: Record<PaymentStatus, string> = {
    0: "pending",
    1: "approved",
    2: "rejected",
};