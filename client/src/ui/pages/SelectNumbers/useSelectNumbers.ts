import { useState } from 'react';

export const useSelectNumbers = () => {
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [numberOfWeeks, setNumberOfWeeks] = useState<number>(1);

    const toggleNumber = (num: number) => {
        if (selectedNumbers.includes(num)) {
            setSelectedNumbers(selectedNumbers.filter(n => n !== num));
        } else {
            if (selectedNumbers.length < 8) {
                setSelectedNumbers([...selectedNumbers, num]);
            }
        }
    };

    const clearSelection = () => {
        setSelectedNumbers([]);
    };

    const calculatePricePerWeek = (): number => {  // <-- OMDØBT
        const count = selectedNumbers.length;

        if (count === 5) return 20;
        else if (count === 6) return 40;
        else if (count === 7) return 80;
        else if (count === 8) return 160;

        return 0;
    };

    const calculateTotalPrice = (): number => {  // <-- NY FUNKTION
        return calculatePricePerWeek() * numberOfWeeks;
    };

    const canSubmit = (): boolean => {
        return selectedNumbers.length >= 5 && selectedNumbers.length <= 8;
    };

    return {
        selectedNumbers,
        numberOfWeeks,
        setNumberOfWeeks,
        toggleNumber,
        clearSelection,
        calculatePricePerWeek,  // <-- EKSPORTER BEGGE
        calculateTotalPrice,
        canSubmit
    };
};