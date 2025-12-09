import {useState} from "react";

export const useGameInformation = () => {
    const [expandedGame, setExpandedGame] = useState<string | null>(null);

    return {
        expandedGame,
        setExpandedGame,
    }
}