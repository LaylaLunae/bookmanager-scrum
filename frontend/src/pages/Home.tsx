import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Header } from "../components/shared/Header"; // 👈 Ton nouveau composant
import { CataloguePanel } from "../components/client/CataloguePanel";
import { MyBooksPanel } from "../components/client/MyBookPanel";
import { ManagementPanel } from "../components/admin/ManagementPanel";
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [activeTab, setActiveTab] = useState<'catalogue' | 'mes-livres' | 'gestion'>('catalogue');
    const [selectedBook, setSelectedBook] = useState<string | null>(null);

    useEffect(() => {
        if (user === null) navigate('/connexion');
    }, [user, navigate]);

    if (user === null) return null;

    return (
        <div className="dashboard-container">
            <Header
                username={user.username}
                role={user.role}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onResetBook={() => setSelectedBook(null)}
                onLogout={logout}
            />

            <div className="dashboard-content">

                <div className={`main-panel ${!selectedBook ? 'full-width' : ''}`}>
                    {activeTab === 'catalogue' && <CataloguePanel onSelectBook={setSelectedBook} />}
                    {activeTab === 'mes-livres' && <MyBooksPanel onSelectBook={setSelectedBook} />}
                    {activeTab === 'gestion' && user.role === 'admin' && <ManagementPanel onSelectBook={setSelectedBook} />}
                </div>

                {selectedBook && (
                    <div className="side-panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3>Visualisation</h3>
                            <button onClick={() => setSelectedBook(null)} className="filter-button">Fermer ✕</button>
                        </div>

                        <div className="placeholder-box">
                            <h4>{selectedBook}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#a8a8b3', marginTop: '1rem' }}>
                                Détails complets du livre sélectionné...
                            </p>
                        </div>

                        {activeTab === 'gestion' && (
                            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                                <button className="filter-button active" style={{ backgroundColor: '#e7a93c', border: 'none', color: 'black', flex: 1 }}>Modifier</button>
                                <button className="filter-button active" style={{ backgroundColor: '#f75a68', border: 'none', flex: 1 }}>Supprimer</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;