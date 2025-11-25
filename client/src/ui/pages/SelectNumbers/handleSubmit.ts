export const handleSubmit = (
    selectedNumbers: number[],
    numberOfWeeks: number,
    calculatePricePerWeek: () => number,
    calculateTotalPrice: () => number,
    canSubmit: () => boolean
) => {
    if (canSubmit()) {
        const pricePerWeek = calculatePricePerWeek();
        const totalPrice = calculateTotalPrice();

        console.log('Spillebræt:', {
            numbers: selectedNumbers.sort((a, b) => a - b),
            weeks: numberOfWeeks,
            pricePerWeek: pricePerWeek,
            totalPrice: totalPrice,
            firstPayment: pricePerWeek
        });

        // Alert besked
        if (numberOfWeeks === 1) {
            alert(`Bræt oprettet!\n\nTal: ${selectedNumbers.sort((a, b) => a - b).join(', ')}\n\nDu betaler ${pricePerWeek} DKK nu.`);
        } else {
            alert(`Bræt oprettet!\n\nTal: ${selectedNumbers.sort((a, b) => a - b).join(', ')}\n\nDu betaler ${pricePerWeek} DKK nu.\nDerefter ${pricePerWeek} DKK ugentligt i ${numberOfWeeks - 1} ${numberOfWeeks - 1 === 1 ? 'uge' : 'uger'} mere.\n\nSamlet: ${totalPrice} DKK`);
        }
    }
};