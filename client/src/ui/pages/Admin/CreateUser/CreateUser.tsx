import './createUser.css';
import {createUserFunction, useCreateUser} from "./useCreateUser.ts";

export default function CreateUser() {

    const {
        formData,
        setFormData,
        passwordError,
        setPasswordError,
        showPassword,
        setShowPassword,
    } = useCreateUser();

    const validatePassword = () => {
        if (formData.password.length < 6) {
            setPasswordError('Password skal være mindst 6 tegn');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePassword()) {
            return;
        }

        console.log('Opret bruger:', formData);

        await createUserFunction(formData);
        
        alert(`Bruger oprettet: ${formData.fullName}\nPassword: ${formData.password}`);

        // Nulstil form
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            password: '',
            isActive: false
        });
        setShowPassword(false);
    };

    return (
        <div className="create-user-container">
            <h1>Opret Ny Bruger</h1>
            <p className="subtitle">Tilføj et nyt medlem til systemet</p>

            <form onSubmit={async (e) => await handleSubmit(e)} className="user-form">
                <div className="form-group">
                    <label htmlFor="fullName">Fulde navn *</label>
                    <input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="f.eks. Peter Jensen"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="f.eks. peter@email.dk"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Telefonnummer *</label>
                    <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="f.eks. 12345678"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <div className="password-input-group">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="Mindst 6 tegn"
                        />
                        <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            title={showPassword ? "Skjul password" : "Vis password"}
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    {passwordError && <span className="error-text">{passwordError}</span>}
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        />
                        <span>Aktiver bruger med det samme</span>
                    </label>
                    <p className="hint">Kun aktive brugere kan købe spillebrætter</p>
                </div>

                <div className="info-box">
                    <strong>💡 Tip:</strong> Skriv passwordet ned og giv det til brugeren, da de skal bruge det til at logge ind.
                </div>

                <button type="submit" className="submit-btn">
                    Opret Bruger
                </button>
            </form>
        </div>
    );
}