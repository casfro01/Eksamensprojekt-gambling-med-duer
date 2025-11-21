import { useNavigate } from 'react-router';
import './profileButton.css';

export default function ProfileButton() {
    const navigate = useNavigate();

    return (
        <button
            className="floating-profile-btn"
            onClick={() => navigate('/profile')}
            title="Min Profil"
        >
            👤
        </button>
    );
}