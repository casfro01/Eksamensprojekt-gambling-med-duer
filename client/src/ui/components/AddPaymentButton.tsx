import { useNavigate } from 'react-router';
import './addPaymentButton.css';

export default function AddPaymentButton() {
    const navigate = useNavigate();

    return (
        <button
            className="floating-payment-btn"
            onClick={() => navigate('/add-payment')}
            title="Indsæt penge"
        >
            💰
        </button>
    );
}