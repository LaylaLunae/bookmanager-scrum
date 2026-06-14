import { useState } from 'react';
import { InputField, InputFieldCheckbox } from '../components/shared/InputField.tsx';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


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

        } catch (error) {
            console.error("Le backend a renvoyé une erreur :", error);
        }
    };

    return (
        <div>
            <h2> Inscription </h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <InputField
                        label="Nom d'utilisateur"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputField
                        label="Adresse e-mail"
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                    <InputField
                        label="Mot de passe"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputField
                        label="Confirmer le mot de passe"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputFieldCheckbox
                        label="Administrateur"
                        type="checkbox"
                        value={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <button type="submit"> S'inscrire </button>
            </form>

        </div>
    );
}

export default Subscription