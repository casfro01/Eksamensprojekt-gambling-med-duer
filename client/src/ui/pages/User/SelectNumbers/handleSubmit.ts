import { boardClient } from "../../../../core/api-clients";
import type { CreateBoardDto, UserData } from "../../../../core/ServerAPI";
import { calculatePrice } from "../../../../utils/CalculatePrice";

export interface SubmitResult {
    success: boolean;
    message: string;
    error?: string;
}

export const handleSubmit = async (
    selectedNumbers: number[],
    numberOfWeeks: number,
    canSubmit: () => boolean,
    authUser: UserData | null
): Promise<SubmitResult> => {
    if (!canSubmit()) {
        return {
            success: false,
            message: 'Ugyldigt valg',
            error: 'Du skal vælge mellem 5-8 numre for at oprette en plade'
        };
    }

    if (!authUser?.id) {
        return {
            success: false,
            message: 'Ikke logget ind',
            error: 'Du skal være logget ind for at oprette en plade'
        };
    }

    if (!authUser.isActive) {
        return {
            success: false,
            message: 'Konto inaktiv',
            error: 'Din konto er inaktiv.'
        };
    }

    // Check if user has sufficient balance
    const requiredAmount = calculatePrice(selectedNumbers.length);
    const userBalance = authUser.balance ?? 0;

    if (userBalance < requiredAmount) {
        const missingAmount = requiredAmount - userBalance;
        return {
            success: false,
            message: `❌ Utilstrækkelig saldo\n\nDu har ikke nok penge på din konto.\n\nPåkrævet: ${requiredAmount} DKK\nDin saldo: ${userBalance} DKK\nMangler: ${missingAmount} DKK\n\nIndbetal penge for at fortsætte.`,
            error: `Insufficient balance. Required: ${requiredAmount} DKK, Available: ${userBalance} DKK`
        };
    }

    try {
        const dto: CreateBoardDto = {
            userId: authUser.id,
            weeks: numberOfWeeks,
            playedNumbers: [...selectedNumbers].sort((a, b) => a - b),
        };

        const response = await boardClient.createBoard(dto);
        if (response.id == null) {
            return {
                success: false,
                message: 'Fejl',
                error: 'Kunne ikke oprette spilleplade. Er din saldo tilstrækkelig?'
            };
        }

        const weekText = numberOfWeeks === 1 ? 'uge' : 'uger';
        const successMessage = numberOfWeeks > 1
            ? `✅ Spilleplade oprettet!\n\nDin plade spiller i ${numberOfWeeks} ${weekText}.\nDu betaler ${numberOfWeeks === 1 ? 'nu' : 'nu og derefter ugentligt'}.\n\nDu bliver nu sendt til dine plader.`
            : `✅ Spilleplade oprettet!\n\nDin plade er klar til denne uge.\n\nDu bliver nu sendt til dine plader.`;

        return {
            success: true,
            message: successMessage
        };
    } catch (error: any) {
        console.error('Fejl ved oprettelse af spillebræt:', error.message);
        
        return {
            success: false,
            message: "Fejl",
            error: error.message
        };
    }
};