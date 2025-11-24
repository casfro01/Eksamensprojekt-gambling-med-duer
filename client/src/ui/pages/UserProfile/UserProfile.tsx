import React, { useState } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router';
import {useGetLoggedInUser, useLoginInformation} from "../Home/useLogin.ts";
import {useIsValidLogin} from "../../../utils/checkLogin.ts";

interface UserData {
    fullName: string;
    email: string;
    phone: string;
    balance: number;
    isActive: boolean;
}

export default function UserProfile() {
    const navigate = useNavigate();
    const isValidLogin = useIsValidLogin();
    const authUser = useGetLoggedInUser();

    if (!isValidLogin) navigate('/login');

    // Dummy data - skal hentes fra backend senere

    const [userData, setUserData] = useState<UserData>({
        fullName: authUser.fullName,
        email: authUser.email,
        phone: '12345678',
        balance: 250,
        isActive: true
    });

    // TODO : flyt
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // TODO : flyt
    const [editForm, setEditForm] = useState({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone
    });

    // TODO : flyt
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // TODO : flyt
    const [passwordError, setPasswordError] = useState('');

    // TODO : flyt indholdet
    const handleSaveProfile = () => {
        setUserData({...userData, ...editForm});
        setIsEditingProfile(false);
        alert('Profil opdateret!');
    };

    // TODO : flyt indholdet
    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();

        // Validering
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
                    <button className="topup-btn">💰 Indbetal</button>
                </div>

                {/* Profile info section */}
                <div className="info-section">
                    <div className="section-header">
                        <h2>Personlige oplysninger</h2>
                        {!isEditingProfile && (
                            <button
                                className="edit-btn"
                                onClick={() => setIsEditingProfile(true)}
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
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                />
                            </div>
                            <div className="form-actions">
                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        setEditForm({
                                            fullName: userData.fullName,
                                            email: userData.email,
                                            phone: userData.phone
                                        });
                                        setIsEditingProfile(false);
                                    }}
                                >
                                    Annuller
                                </button>
                                <button className="save-btn" onClick={handleSaveProfile}>
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
                                <span className="info-value">{userData.phone}</span>
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
                                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nyt password</label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
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
                                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
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
            </div>
        </div>
    );
}