import { useNavigate } from 'react-router';
import './profileButton.css';
import {useIsValidLogin} from "../../utils/checkLogin.ts";

export default function ProfileButton() {
    const navigate = useNavigate();
    const validLogin = useIsValidLogin();

    return (
        <button
            className="floating-profile-btn"
            onClick={() => {
                if (validLogin) {
                    navigate('/profile');
                } else {
                    navigate('/login');
                }
            }}
            title="Min Profil"
        >
            👤
        </button>
    );
}