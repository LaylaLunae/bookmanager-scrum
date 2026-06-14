import './Header.css';

interface HeaderProps {
    username: string;
    role: 'admin' | 'client';
    activeTab: 'catalogue' | 'mes-livres' | 'gestion';
    setActiveTab: (tab: 'catalogue' | 'mes-livres' | 'gestion') => void;
    onResetBook: () => void;
    onLogout: () => void;
}

export function Header({ username, role, activeTab, setActiveTab, onResetBook, onLogout }: HeaderProps) {
    const handleTabChange = (tab: 'catalogue' | 'mes-livres' | 'gestion') => {
        setActiveTab(tab);
        onResetBook();
    };

    return (
        <header className="dashboard-header">
            <div className="dashboard-user-title">
                Bonjour {username} !
            </div>

            <nav className="dashboard-navbar">
                <button
                    className={`nav-button ${activeTab === 'catalogue' ? 'active' : ''}`}
                    onClick={() => handleTabChange('catalogue')}
                >
                    Catalogue
                </button>
                <button
                    className={`nav-button ${activeTab === 'mes-livres' ? 'active' : ''}`}
                    onClick={() => handleTabChange('mes-livres')}
                >
                    Mes livres
                </button>

                {role === 'admin' && (
                    <button
                        className={`nav-button ${activeTab === 'gestion' ? 'active' : ''}`}
                        onClick={() => handleTabChange('gestion')}
                    >
                        Gestion
                    </button>
                )}
            </nav>

            <button onClick={onLogout} className="logout-button">
                Se déconnecter
            </button>
        </header>
    );
}