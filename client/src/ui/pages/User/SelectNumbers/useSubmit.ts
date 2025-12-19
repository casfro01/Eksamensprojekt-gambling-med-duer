import {useState} from "react";

// man kan også flytte resten af submit funktionaliteten herind
export const useSubmit= () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    return {
        isSubmitting,
        setIsSubmitting,
    }
}