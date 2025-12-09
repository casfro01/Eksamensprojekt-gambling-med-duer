import { useNavigate } from 'react-router';
import './homeButton.css';
import {useIsValidLogin} from "../../utils/checkLogin.ts";



export default function HomeButton() {
    const navigate = useNavigate();
    const validLogin = useIsValidLogin();

    return (
        <button
            className="floating-home-btn"
            onClick={() => {
                if (validLogin) {
                    navigate('/');
                } else {
                    navigate('/login');
                }
            }}
            title="Hjem"
        >
            🏠
        </button>
    );
}