import './Register.css';
import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/user/register', {
            username: username,
            email: email,
            password: password,
        })
        .then(res => {
            console.log(res.data);
            alert('Inscription réussie, vous pouvez maintenant vous connecter');
            navigate('/'); // Redirection vers la page de connexion
        })
        .catch(err => {
            console.error(err.response);
            alert('Erreur lors de l\'inscription : ' + (err.response?.data?.error || 'Veuillez réessayer.'));
        });
    };

    return (
        <div className="login_div">
            <form onSubmit={handleSubmit}>
                <h3>Créer un compte :</h3>

                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="Nom d'utilisateur" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Mot de passe" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <p>Vous avez déjà un compte ? <Link to="/">Se connecter</Link></p>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Register;
