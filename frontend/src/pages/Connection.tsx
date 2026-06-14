import { useState } from 'react';
import { InputField } from '../components/shared/InputField.tsx';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Connection.css';

function Connection() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: email,
                password: password
            });

            const userFromServer = response.data;
            login(userFromServer);
            console.log("Utilisateur connecté avec succès !", response.data);
            navigate('/');

        } catch (error: any) {
            console.error("Le backend a renvoyé une erreur :", error);
            setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Connexion</h1>

                <form onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                        <InputField
                            label="Adresse e-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="auth-form-group">
                        <InputField
                            label="Mot de passe"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {errorMessage && <p className="auth-error-message">{errorMessage}</p>}

                    <button type="submit" className="auth-button">Se connecter</button>
                </form>

                <p className="auth-switch-text">
                    Pas encore de compte ? <Link to="/inscription">Inscrivez-vous</Link>
                </p>
            </div>
        </div>
    );
}

export default Connection;