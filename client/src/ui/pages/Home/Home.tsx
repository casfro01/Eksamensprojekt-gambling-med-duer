import './Home.css';
import {useNavigate} from 'react-router';
import ProfileButton from '../../components/ProfileButton';

export default function Home() {
    const navigate = useNavigate();
    const handlePlayClick = () => {
        console.log('Gå til spil!');
        navigate('/select');
    };

    return (
        <div className="home-container">
            <ProfileButton />
            <div className="home-content">
                {/* Header */}
                <header className="home-header">
                    <h1 className="game-title">Døde Duer</h1>
                    <p className="game-subtitle">Støt Jerne IF og vind præmier hver uge!</p>
                </header>

                {/* Call to Action knap */}
                <div className="cta-section">
                    <button className="play-button" onClick={handlePlayClick}>
                        <span className="play-icon">🎲</span>
                        Spil Nu
                    </button>
                </div>

                {/* Regler sektion */}
                <section className="rules-section">
                    <h2 className="rules-title">Sådan spiller du</h2>

                    <div className="rules-grid">
                        <div className="rule-card">
                            <div className="rule-number">1</div>
                            <h3>Vælg dine tal</h3>
                            <p>Vælg mellem 5-8 tal fra 1-16 på dit spillebræt. Jo flere tal, jo højere præmie!</p>
                        </div>

                        <div className="rule-card">
                            <div className="rule-number">2</div>
                            <h3>Vent på trækningen</h3>
                            <p>Hver uge trækkes 3 vindernumre. Tilmelding lukker lørdag kl. 17:00.</p>
                        </div>

                        <div className="rule-card">
                            <div className="rule-number">3</div>
                            <h3>Tjek om du vandt</h3>
                            <p>Har dit spillebræt alle 3 vindernumre? Så er du med i præmiepuljen! Rækkefølgen er ligegyldig.</p>
                        </div>

                        <div className="rule-card">
                            <div className="rule-number">4</div>
                            <h3>Del præmien</h3>
                            <p>70% af indtægterne deles mellem vinderne. De resterende 30% går til Jerne IF.</p>
                        </div>
                    </div>
                </section>

                {/* Priser sektion */}
                <section className="pricing-section">
                    <h2 className="pricing-title">Priser per spillebræt</h2>
                    <div className="pricing-grid">
                        <div className="price-card">
                            <div className="price-fields">5 tal</div>
                            <div className="price-amount">20 DKK</div>
                        </div>
                        <div className="price-card">
                            <div className="price-fields">6 tal</div>
                            <div className="price-amount">40 DKK</div>
                        </div>
                        <div className="price-card">
                            <div className="price-fields">7 tal</div>
                            <div className="price-amount">80 DKK</div>
                        </div>
                        <div className="price-card highlight">
                            <div className="price-fields">8 tal</div>
                            <div className="price-amount">160 DKK</div>
                            <div className="price-label">Bedste odds</div>
                        </div>
                    </div>
                </section>

                {/* Info boxes */}
                <section className="info-section">
                    <div className="info-box">
                        <h3>💰 Balance System</h3>
                        <p>Indbetal til din saldo via MobilePay, og spil så længe du har balance. Alle transaktioner godkendes af admin.</p>
                    </div>
                    <div className="info-box">
                        <h3>🔄 Gentag dine brætter</h3>
                        <p>Spil de samme tal i op til 10 uger i træk. Du kan altid stoppe når du vil.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}