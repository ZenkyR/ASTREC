import { Link } from "react-router-dom";
import axios from "axios"

export const Sidebar = () => {
    const admin = sessionStorage.getItem("admin")

    function deco() {
        axios.post('https://127.0.0.1:8000/deco')
        .then(function(res) {
            if(res.data === 1) {
                sessionStorage.setItem("connexion", "false")
                sessionStorage.setItem("admin", "false")
                window.location.reload();
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    return (
        <>
            {admin === "true"
                ?
                <div className="sidebar">
                    <h1>Compte</h1>
                    <h1>Commandes</h1>
                    <h1>Retours</h1>
                    <div className="lign"></div>
                    <Link to={'/article'}>
                        <h1>Articles</h1>
                    </Link>
                    <Link to={'/admin_category'}>
                        <h1>Catégories</h1>
                    </Link>
                    <Link to={'/users'}>
                        <h1>Utilisateur</h1>
                    </Link>
                    <Link to={'/admin_fdp'}>
                        <h1>Livraison</h1>
                    </Link>
                   
                    <Link to={'/'} onClick={deco}>
                        <h1>Se déconnecter</h1>
                    </Link>
                </div>
                :
                <div className="sidebar">
                    <h1>Compte</h1>
                    <h1>Mes commandes</h1>
                    <h1>Mes retours</h1>
                    <h1>Besoin d'aide ?</h1>
                    <div className="lign"></div>
                    <Link to={'/'} onClick={deco}>
                        <h1>Se déconnecter</h1>
                    </Link>
                </div>
            }
        </>
    )
}