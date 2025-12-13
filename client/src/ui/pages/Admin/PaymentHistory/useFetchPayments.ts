import {useEffect, useState} from "react";
import type {BaseTransactionResponse} from "../../../../core/ServerAPI.ts";
import {transactionClient} from "../../../../core/api-clients.ts";
import {SieveQueryBuilder} from "ts-sieve-query-builder";

export function useFetchPayments(){
    // TODO måske lave page i stien på siden, så man kan "skippe" og alt det, men det virker som noget arbejde
    const [payments, setpayments] = useState<BaseTransactionResponse[]>([]);
    const [page, setPage] = useState(1);
    const [allTransactionsNumber, setAllTransactionsNumber] = useState<number>(0);
    useEffect(() => {
        async function fetch() {
            const query = SieveQueryBuilder.create<BaseTransactionResponse>().sortByDescending("created").page(page).pageSize(20).buildSieveModel();
            const num = await transactionClient.getAmountOfTransactions();
            const list = await transactionClient.getTransactions(query);
            return {
                num,
                list,
            }
        }
        fetch().then(response => {setpayments(response.list); setAllTransactionsNumber(response.num)});
    }, [page]);
    return {
        payments,
        allTransactionsNumber,
        page,
        setPage,
    };
}