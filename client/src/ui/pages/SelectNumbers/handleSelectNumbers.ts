export const handleSelectNumbers = (
    selectedNumbers: number[],
    numberOfWeeks: number,
    calculatePrice: () => number,
    canSubmit: () => boolean
) => {
    if (canSubmit()) {
        console.log('Spillebræt:', {
            numbers: selectedNumbers.sort((a, b) => a - b),
            weeks: numberOfWeeks,
            price: calculatePrice()
        });
        // Send data videre til backend (senere)!!!
        alert(`Bræt oprettet! Tal: ${selectedNumbers.sort((a, b) => a - b).join(', ')}`);
    }
};