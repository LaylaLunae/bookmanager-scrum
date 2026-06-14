import { useState } from 'react';
import { InputField, InputFieldCheckbox } from '../components/shared/InputField.tsx';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Subscription.css';

function Subscription() {
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const roleText = isAdmin ? 'admin' : 'client';
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username: username,
                email: mail,
                password: password,
                role: roleText
            });

            const userFromServer = response.data;
            login(userFromServer);
            console.log("Utilisateur créé avec succès !", response.data);
            navigate('/');

        } catch (error: any) {
            console.error("Le backend a renvoyé une erreur :", error);
            setErrorMessage("Ce nom d'utilisateur ou cet e-mail est déjà utilisé !");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Inscription</h2>

                <form onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                        <InputField
                            label="Nom d'utilisateur"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="auth-form-group">
                        <InputField
                            label="Adresse e-mail"
                            type="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
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
                    <div className="auth-form-group">
                        <InputField
                            label="Confirmer le mot de passe"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="auth-form-group-checkbox">
                        <InputFieldCheckbox
                            label="Administrateur"
                            type="checkbox"
                            value={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </div>

                    {errorMessage && <p className="auth-error-message">{errorMessage}</p>}

                    <button type="submit" className="auth-button">S'inscrire</button>
                </form>

                <p className="auth-switch-text">
                    Déjà un compte ? <Link to="/connexion">Connectez-vous</Link>
                </p>
            </div>
        </div>
    );
}

export default Subscription;