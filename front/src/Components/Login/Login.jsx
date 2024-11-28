import './Login.css'
import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8080/user/login', {
            email: email,
            password: password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            console.log(res.data)
            alert('Vous êtes connecté')
            navigate('/dashboard')
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    return (
        <div className="login_div">
            <form onSubmit={handleSubmit}>
                <h3>Bienvenue sur l'espace de connexion : </h3>

                <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" name="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                <p>Vous n'avez pas de compte ? <Link to="/register">Créer un compte</Link></p>
                <button type="submit">Connexion</button>
            </form>
        </div>
    )
}

export default Login
