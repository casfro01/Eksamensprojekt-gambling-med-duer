import {useState} from "react";

export const usePaymentStates = () => {
    const [amount, setAmount] = useState<string>('');
    const [mobilePayId, setMobilePayId] = useState<string>('');
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    return {
        amount,
        mobilePayId,
        showTooltip,
        setAmount,
        setMobilePayId,
        setShowTooltip
    }
}