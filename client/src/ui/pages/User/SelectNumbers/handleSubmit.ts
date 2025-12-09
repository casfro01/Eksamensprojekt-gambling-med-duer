import { boardClient } from "../../../../core/api-clients";
import type { CreateBoardDto, UserData } from "../../../../core/ServerAPI";



export const handleSubmit = async (
    selectedNumbers: number[],
    numberOfWeeks: number,
    canSubmit: () => boolean,
    authUser: UserData | null
) => {
    if (canSubmit()) {
        if (!authUser?.id) {
            alert('Du er ikke logget ind');
            return;
        }

        try {
            const dto: CreateBoardDto = {
                userId: authUser?.id,
                weeks: numberOfWeeks,
                playedNumbers: [...selectedNumbers].sort((a, b) => a - b),
            };
            const response = await boardClient.createBoard(dto);
            console.log('Spillebræt oprettet:', response);
        } catch (error) {
            console.error('Fejl ved oprettelse af spillebræt:', error);
        };
    }
};