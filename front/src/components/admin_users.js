import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

export const Users = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [id, setId] = useState(0);

    const getData = () => {
        axios.post("https://127.0.0.1:8000/users", {search: search})
             .then((res) => setUsers(res.data))
             .catch((err) => console.log(err));
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const submitOption = (e) => {
        if(e.target.value === "adminOui" && e.target.id !== "admin") {
            axios.post("https://127.0.0.1:8000/users/setAdmin/"+e.target.id, {'value': true})
                 .then((res) => {
                    if(res.data === 1) {
                        setId(e.target.id)
                    }
                 })
                 .catch((err) => console.log(err));
        } else if(e.target.value === "adminNon" && e.target.id !== "admin") {
            axios.post("https://127.0.0.1:8000/users/setAdmin/"+e.target.id, {'value': false})
                 .then((res) => {
                    if(res.data === 1) {
                        setId(e.target.id)
                    }
                 })
                 .catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        getData();
    }, [search])

    return (
        <>
            <Sidebar />
            <div className="users">
                <h1>Users</h1>
                <div>
                    <input type="text" name="searchUsers" id="searchUsers" placeholder="Rechercher..." onChange={handleSearch} />
                </div>
                <table className="admin">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Prénom/Nom</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name} {user.lastname}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.admin ?
                                        <select name="admin" id="admin" onClick={submitOption}>
                                            <option id={user.id} value="adminOui" selected>Oui</option>
                                            <option id={user.id} value="adminNon">Non</option>
                                        </select>
                                        :
                                        <select name="admin" id="admin" onClick={submitOption}>
                                            <option id={user.id} value="adminOui">Oui</option>
                                            <option id={user.id} value="adminNon" selected>Non</option>
                                        </select>
                                    }
                                    {user.id == id && (
                                        <p>Modifié</p>
                                    )}
                                </td>
                                <td><Link>Modifier</Link></td>
                                <td><Link>Supprimer</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}