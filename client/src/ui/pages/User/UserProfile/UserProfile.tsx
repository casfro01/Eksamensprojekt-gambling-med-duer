import React, {useState} from 'react';
import './userProfile.css';
import {useNavigate} from 'react-router';
import {useIsValidLogin} from "../../../../utils/checkLogin.ts";
import {useEditProfile} from "./EditProfile.ts";
import {useEditUserData} from "./EditUserData.ts";
import {useChangePassword} from "./ChangePassword.ts";
import {useGetLoggedInUser} from "../../Home/useLogin.ts";
import {useRemoveToken} from "../../../../core/atoms/token.ts";

export function UserProfile(){
    const navigate = useNavigate();
    const isValidLogin = useIsValidLogin();
    const setToken = useRemoveToken();

    const {
        authUser,
        setUserData,
        refresh,
        setRefresh
    } = useGetLoggedInUser();
    // rename
    const userData = authUser;

    if (!isValidLogin) navigate('/login');

    const {
        isEditingProfile,
        isChangingPassword,
        showPassword,
        setIsEditingProfile,
        setIsChangingPassword,
        setShowPassword
    } = useEditProfile()

    const {
        editForm,
        setEditForm
    } = useEditUserData(userData)

    const {
        passwordForm,
        setPasswordForm,
    } = useChangePassword()

    // TODO : flyt
    const [passwordError, setPasswordError] = useState('');

    // TODO : flyt indholdet
    const handleSaveProfile = async () => {
        const res = await setUserData({...userData, ...editForm});
        setIsEditingProfile(false);
        if (res){
            alert('Profil opdateret!');
            setRefresh(refresh + 1);
        }
        else alert("Opdatering fejlede, tjek din forbindelse.")
    };

    // TODO : flyt indholdet
    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordForm.newPassword.length < 6) {
            setPasswordError('Nyt password skal være mindst 6 tegn');
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('Passwords matcher ikke');
            return;
        }

        // Send til backend senere
        console.log('Skift password:', passwordForm);
        alert('Password ændret!');

        // Nulstil form
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setIsChangingPassword(false);
        setPasswordError('');
    };
    const handleLogout = () => {
        if (confirm('Er du sikker på at du vil logge ud?')) {
            setToken(null);
            navigate('/login');
        }
    };


    if (authUser == null || userData == null) return <p>Failed to load data.</p>;

    return (
        <div className="profile-container">
            <div className="profile-content">
                {/* Header */}
                <div className="profile-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ← Tilbage
                    </button>
                    <h1>Min Profil</h1>
                </div>

                {/* Status banner */}
                <div className={`status-banner ${userData.isActive ? 'active' : 'inactive'}`}>
                    <span className="status-icon">{userData.isActive ? '✓' : '⏸'}</span>
                    <span>Din konto er {userData.isActive ? 'aktiv' : 'inaktiv'}</span>
                </div>

                {/* Balance card */}
                <div className="balance-card">
                    <div className="balance-info">
                        <span className="balance-label">Din saldo</span>
                        <span className="balance-amount">{userData.balance} DKK</span>
                    </div>
                    <button className="topup-btn" onClick={() => navigate('/add-payment')}>
                        💰 Indbetal
                    </button>
                </div>

                {/* Profile info section */}
                <div className="info-section">
                    <div className="section-header">
                        <h2>Personlige oplysninger</h2>
                        {!isEditingProfile && (
                            <button
                                className="edit-btn"
                                onClick={() => {
                                    setEditForm({
                                        fullName: userData.fullName,
                                        email: userData.email,
                                        phoneNumber: userData.phoneNumber
                                    });
                                    setIsEditingProfile(true)
                                }}
                            >
                                ✏️ Rediger
                            </button>
                        )}
                    </div>

                    {isEditingProfile ? (
                        <div className="edit-form">
                            <div className="form-group">
                                <label>Navn</label>
                                <input
                                    type="text"
                                    value={editForm.fullName}
                                    onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Telefon</label>
                                <input
                                    type="tel"
                                    value={editForm.phoneNumber}
                                    onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})}
                                />
                            </div>
                            <div className="form-actions">
                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        setEditForm({
                                            fullName: userData.fullName,
                                            email: userData.email,
                                            phoneNumber: userData.phoneNumber
                                        });
                                        setIsEditingProfile(false);
                                    }}
                                >
                                    Annuller
                                </button>
                                <button className="save-btn" onClick={async () => {await handleSaveProfile()}}>
                                    Gem ændringer
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="info-display">
                            <div className="info-row">
                                <span className="info-label">Navn:</span>
                                <span className="info-value">{userData.fullName}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Email:</span>
                                <span className="info-value">{userData.email}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Telefon:</span>
                                <span className="info-value">{userData.phoneNumber}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Password section */}
                <div className="info-section">
                    <div className="section-header">
                        <h2>Sikkerhed</h2>
                    </div>

                    {!isChangingPassword ? (
                        <button
                            className="change-password-trigger"
                            onClick={() => setIsChangingPassword(true)}
                        >
                            🔒 Skift password
                        </button>
                    ) : (
                        <form onSubmit={handleChangePassword} className="password-form">
                            <div className="form-group">
                                <label>Nuværende password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({
                                        ...passwordForm,
                                        currentPassword: e.target.value
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nyt password</label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({
                                            ...passwordForm,
                                            newPassword: e.target.value
                                        })}
                                        placeholder="Mindst 6 tegn"
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Bekræft nyt password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({
                                        ...passwordForm,
                                        confirmPassword: e.target.value
                                    })}
                                />
                            </div>
                            {passwordError && <span className="error-text">{passwordError}</span>}
                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => {
                                        setIsChangingPassword(false);
                                        setPasswordForm({
                                            currentPassword: '',
                                            newPassword: '',
                                            confirmPassword: ''
                                        });
                                        setPasswordError('');
                                    }}
                                >
                                    Annuller
                                </button>
                                <button type="submit" className="save-btn">
                                    Gem nyt password
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    🚪 Log ud
                </button>
            </div>
        </div>
    );
}