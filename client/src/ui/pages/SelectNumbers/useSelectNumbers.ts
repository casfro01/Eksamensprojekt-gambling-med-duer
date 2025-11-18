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

    const calculatePrice = (): number => {
        const count = selectedNumbers.length;
        let pricePerWeek = 0;

        if (count === 5) pricePerWeek = 20;
        else if (count === 6) pricePerWeek = 40;
        else if (count === 7) pricePerWeek = 80;
        else if (count === 8) pricePerWeek = 160;

        return pricePerWeek * numberOfWeeks;
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
        calculatePrice,
        canSubmit
    };
};