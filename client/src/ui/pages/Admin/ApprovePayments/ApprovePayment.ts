import {transactionClient} from "../../../../core/api-clients.ts";
import type {PaymentStatus, UpdateTransactionDto} from "../../../../core/ServerAPI.ts";

export async function approvePayments(paymentID: string, status: PaymentStatus): Promise<string> {
    const dto: UpdateTransactionDto = {
        id: paymentID,
        paymentStatus: status
    }
    const ans = await transactionClient.updatePaymentStatus(dto)
    if (ans) return "success"
    return "not successful"
}