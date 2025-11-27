import { useNavigate } from 'react-router';
import './addPaymentButton.css';
import {useIsValidLogin} from "../../utils/checkLogin.ts";

export default function AddPaymentButton() {
    const navigate = useNavigate();
    const isValidLogin = useIsValidLogin();

    return (
        <button
            className="floating-payment-btn"
            onClick={() => {
                if (!isValidLogin) navigate('/login');
                else navigate('/add-payment');
            }}
            title="Indsæt penge"
        >
            💰
        </button>
    );
}