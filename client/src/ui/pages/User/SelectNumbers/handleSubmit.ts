import { href, useNavigate, type NavigateFunction } from "react-router";
import { boardClient } from "../../../../core/api-clients";
import type { CreateBoardDto, UserData } from "../../../../core/ServerAPI";



export const handleSubmit = async (
    selectedNumbers: number[],
    numberOfWeeks: number,
    canSubmit: () => boolean,
    authUser: UserData | null,
    navigate: NavigateFunction
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

            await boardClient.createBoard(dto);

            navigate(`/user/boards/`);
            alert('Spillebræt oprettet');
        } catch (error) {
            console.error('Fejl ved oprettelse af spillebræt:', error);
            alert('Fejl ved oprettelse af spillebræt');
        };
    }
};