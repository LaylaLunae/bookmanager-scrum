import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Header } from "../components/shared/Header";
import { CataloguePanel } from "../components/client/CataloguePanel";
import { MyBooksPanel } from "../components/client/MyBookPanel";
import { ManagementPanel } from "../components/admin/ManagementPanel";
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [activeTab, setActiveTab] = useState<'catalogue' | 'mes-livres' | 'gestion'>('catalogue');

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
                onResetBook={() => { }}
                onLogout={logout}
            />

            <div className="dashboard-content">
                <div className="main-panel full-width">
                    {activeTab === 'catalogue' && <CataloguePanel />}
                    {activeTab === 'mes-livres' && <MyBooksPanel />}
                    {activeTab === 'gestion' && user.role === 'admin' && <ManagementPanel />}
                </div>
            </div>
        </div>
    );
}

export default Home;