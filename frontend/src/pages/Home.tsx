import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useEffect } from "react";

function Home() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        if (user === null) {
            navigate('/connexion');
        }
    }, [user, navigate]);

    if (user === null) {
        return null;
    }

    return (
        <div>
            <div>
                <header>
                    <h1>{user ? `Bonjour ${user.username} !` : "Bienvenue sur BookManager"}</h1>
                </header>
                <main>
                    {user && (
                        <button
                            onClick={logout}
                            style={{ backgroundColor: '#ff4d4d', color: 'white', marginBottom: '20px' }}
                        >
                            Se déconnecter
                        </button>
                    )}
                </main>
            </div>
        </div >
    )

}

export default Home