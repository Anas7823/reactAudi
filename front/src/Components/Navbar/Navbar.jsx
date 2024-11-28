import './Navbar.css'
import logo_white from '../../assets/nav/logo_white.png'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        // Vérifie si le token est présent dans localStorage
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Si le token existe, l'utilisateur est connecté
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprime le token
        setIsLoggedIn(false); // Met à jour l'état
        alert('Vous êtes déconnecté');
        navigate('/'); // Redirige vers la page de connexion
    };

    return (
        <div className="navbar">
            <div className='reactaudi'>
            <img src={logo_white} alt="logo" />
            <h1>React Audi</h1>
            </div>

            {/* Si la personne est connecté alors on affiche les liens */}
            {isLoggedIn ? (
                <div className="links">
                    <Link to="/dashboard">Dashboard</Link>
                    {/* <Link to="/lien2">Lien 2</Link>
                    <Link to="/lien3">Lien 3</Link>
                    <Link to="/lien4">Lien 4</Link> */}
                    <button onClick={handleLogout}>Déconnexion</button>
                </div>
            ) : (
                <></>
            )}

        </div>
    )
}

export default Navbar
