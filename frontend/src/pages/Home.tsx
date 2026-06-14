import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Home() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div>
            <div>
                <header>
                    <h1>{user ? `Bonjour ${user.username} !` : "Bienvenue sur BookManager"}</h1>
                </header>
                <main>
                    <button onClick={() => navigate('/inscription')}>
                        Aller à l'inscription
                    </button>
                </main>
            </div>
        </div>
    )

}

export default Home