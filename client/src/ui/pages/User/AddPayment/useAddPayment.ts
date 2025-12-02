import {transactionClient} from "../../../../core/api-clients.ts";
import type {CreateTransactionDto} from "../../../../core/ServerAPI.ts";


export const CreatePayment = async (amount: string, mobilePayId: string): Promise<string> => {
    const amountNum: number = parseInt(amount);

    if (amountNum < 10) {
        return 'Minimumsbeløb er 10 DKK';
    }

    console.log('Indbetaling:', {
        amount: amountNum,
        mobilePayId: mobilePayId
    });
    const dto: CreateTransactionDto = {
        mobilePayId: mobilePayId,
        amount: amountNum,
        email: "ThisIsNot@Needed.dk"
    };
    await transactionClient.createPendingTransactions(dto);


    return `Indbetaling af ${amountNum} DKK er registreret!\n\nMobilePay ID: ${mobilePayId}\n\nDine penge vil være tilgængelige om få minutter.`;
}