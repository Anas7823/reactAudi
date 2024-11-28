import './Dashboard.css'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
    const [users, setUsers] = useState([])
    const [produits, setProduits] = useState([])
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    })
    const [newProduit, setNewProduit] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: ''
    })
    const [editUser, setEditUser] = useState(false)
    const [editProduit, setEditProduit] = useState(false)
    const [searchProduct, setSearchProduct] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8080/users',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setUsers(res.data)
        }).catch(err => {
            console.error(err.response)
        })
    }, [users])

    useEffect(() => {
        axios.get('http://localhost:8080/products',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setProduits(res.data)
        }).catch(err => {
            console.error(err.response)
        })
    }, [produits])

    const handleNewUser = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/user/register', newUser, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data)
            alert('Utilisateur créé avec succès')
            setNewUser({
                username: '',
                email: '',
                password: '',
                role: 'user'
            })
        })
        .catch(err => {
            console.error(err.response)
            alert('Erreur lors de la création : ' + (err.response?.data?.error || 'Veuillez réessayer.'))
        })
    }

    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:8080/user/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data)
            alert('Utilisateur supprimé avec succès')
            setUsers(users.filter(user => user._id !== id))
        })
        .catch(err => {
            console.error(err.response)
            alert('Erreur lors de la suppression : ' + (err.response?.data?.error || 'Veuillez réessayer.'))
        })
    }

    const handleNewProduit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/product/new', newProduit, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data)
            alert('Produit créé avec succès')
            setNewProduit({
                name: '',
                description: '',
                price: 0,
                stock: 0,
                category: ''
            })
        })
        .catch(err => {
            console.error(err.response)
            alert('Erreur lors de la création : ' + (err.response?.data?.error || 'Veuillez réessayer.'))
        })
    }
    
    const handleDeleteProduit = (id) => {
        axios.delete(`http://localhost:8080/product/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data)
            alert('Produit supprimé avec succès')
            setProduits(produits.filter(produit => produit._id !== id))
        })
        .catch(err => {
            console.error(err.response)
            alert('Erreur lors de la suppression : ' + (err.response?.data?.error || 'Veuillez réessayer.'))
        })
    }

    const handleEditUser = (user) => {
        setEditUser(user); // Remplit l'état avec l'utilisateur à modifier
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/user/${editUser._id}`, editUser, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data);
            alert('Utilisateur modifié avec succès');
            // Met à jour l'utilisateur dans la liste des utilisateurs
            setUsers(users.map(user => user._id === editUser._id ? editUser : user));
            setEditUser(false); // Réinitialiser l'état pour fermer le formulaire
        })
        .catch(err => {
            console.error(err.response);
            alert('Erreur lors de la modification : ' + (err.response?.data?.error || 'Veuillez réessayer.'));
        });
    }

    const handleEditProduit = (produit) => {
        setEditProduit(produit); // Remplir l'état avec le produit à modifier
    }
    
    const handleUpdateProduit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8080/product/${editProduit._id}`, editProduit, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data)
            alert('Produit modifié avec succès')
            setProduits(produits.map(produit => produit._id === editProduit._id ? editProduit : produit)) // Met à jour le produit
            setEditProduit(false) // Réinitialiser l'état de modification
        })
        .catch(err => {
            console.error(err.response)
            alert('Erreur lors de la modification : ' + (err.response?.data?.error || 'Veuillez réessayer.'))
        })
    }

    const handleSearchProduct = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:8080/product/search/${searchProduct}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data)
            setProduits(res.data)
            alert('Produit trouver avec succès')
            setSearchProduct('')
        })
        .catch(err => {
            console.error(err.response)
            alert('Erreur lors de la création : ' + (err.response?.data?.error || 'Veuillez réessayer.'))
        })
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bienvenue sur le tableau de bord</p>

            <div className="cards">
                <div className="container">
                    <div className="card">
                        <h2>Création des utilisateurs</h2>
                        <form onSubmit={handleNewUser}>
                            <input type="text" placeholder="Nom d'utilisateur" value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} />
                            <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
                            <input type="password" placeholder="Mot de passe" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
                            <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
                                <option value="user">Utilisateur</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button type="submit">Créer</button>
                        </form>
                        
                    </div>
                    <div className="card">
                        <h2>Création des produits</h2>
                        <form onSubmit={handleNewProduit}>
                            <input type="text" placeholder="Nom" value={newProduit.name} onChange={(e) => setNewProduit({...newProduit, name: e.target.value})} />
                            <input type="text" placeholder="Description" value={newProduit.description} onChange={(e) => setNewProduit({...newProduit, description: e.target.value})} />
                            <input type="number" placeholder="Prix" value={newProduit.price} onChange={(e) => setNewProduit({...newProduit, price: e.target.value})} />
                            <input type="number" placeholder="Stock" value={newProduit.stock} onChange={(e) => setNewProduit({...newProduit, stock: e.target.value})} />
                            <select value={newProduit.category} onChange={(e) => setNewProduit({...newProduit, category: e.target.value})}>
                                <option value="citadine">Citadine</option>
                                <option value="berline">Berline</option>
                                <option value="sportive">Sportive</option> 
                            </select>
                            <button type="submit">Créer</button>
                        </form>
                    </div>
                </div>
                <div className="container">
                    <div className="card" style={{display: editProduit ? 'block' : 'none'}}>
                        <h2>Modification du produit</h2>
                        <form onSubmit={handleUpdateProduit}>
                            <input type="text" placeholder="Nom" value={editProduit.name} onChange={(e) => setEditProduit({...editProduit, name: e.target.value})} />
                            <input type="text" placeholder="Description" value={editProduit.description} onChange={(e) => setEditProduit({...editProduit, description: e.target.value})} />
                            <input type="number" placeholder="Prix" value={editProduit.price} onChange={(e) => setEditProduit({...editProduit, price: e.target.value})} />
                            <input type="number" placeholder="Stock" value={editProduit.stock} onChange={(e) => setEditProduit({...editProduit, stock: e.target.value})} />
                            <select value={editProduit.category} onChange={(e) => setEditProduit({...editProduit, category: e.target.value})}>
                                <option value="citadine">Citadine</option>
                                <option value="berline">Berline</option>
                                <option value="sportive">Sportive</option>
                            </select>
                            <button type="submit">Modifier</button>
                        </form>
                    </div>

                    <div className="card" style={{display: editUser ? 'block' : 'none'}}>
                        <h2>Modification de l'utilisateur</h2>
                        <form onSubmit={handleUpdateUser}>
                            <input
                                type="text"
                                placeholder="Nom d'utilisateur"
                                value={editUser.username}
                                onChange={(e) => setEditUser({...editUser, username: e.target.value})}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={editUser.email}
                                onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                            />
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                value={editUser.password}
                                onChange={(e) => setEditUser({...editUser, password: e.target.value})}
                            />
                            <select
                                value={editUser.role}
                                onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                            >
                                <option value="user">Utilisateur</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button type="submit">Modifier</button>
                        </form>
                    </div>
                </div>
                <div className="container">
                    <div className="card">
                        <h2>Gestion des utilisateurs</h2>
                        {users.map(user => (
                            <div className="card_user" key={user._id}>

                                <h4>{user.username}</h4>
                                <h4>{user.email}</h4>
                                <h4>{user.role}</h4>
                                <h4>{user.createdAt}</h4>

                                <div className="actions">
                                    <h4>Actions</h4>
                                    <button onClick={() => handleEditUser(user)}>Modifier</button>
                                    <button onClick={() => handleDeleteUser(user._id)}>Supprimer</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <h2>Gestion des produits</h2>
                        {/* Input au onchange pour filtrer les produits */}
                        <form onSubmit={handleSearchProduct}>
                            <input type="text" placeholder="Rechercher un produit" value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
                            <button type="submit">Rechercher</button>
                        </form>
                        {produits.map(produit => (
                            <div className="card_produit" key={produit._id}>
                                <h4>{produit.name}</h4>
                                <h4>{produit.description}</h4>
                                <h4>{produit.price}</h4>                    
                                <h4>{produit.stock}</h4>                    
                                <h4>{produit.category}</h4>                    
                                <h4>{produit.createdAt}</h4>                    
                                <div className="actions">
                                    <h4>Actions</h4>
                                    <button onClick={() => handleEditProduit(produit)}>Modifier</button>
                                    <button onClick={() => handleDeleteProduit(produit._id)}>Supprimer</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
