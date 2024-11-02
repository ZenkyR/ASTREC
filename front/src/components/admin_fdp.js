import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const AdminFDP = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [fdp, setFdp] = useState([]);

  const fetchFdp = () => {
    axios
      .post("https://127.0.0.1:8000/fdp", {search: search})
      .then((res) => setFdp(res.data))
      .catch((err) => console.log(err));
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleDelete = (id) => {
    axios.delete("https://127.0.0.1:8000/fdp/delete/" + id)
      .then(() => {
        setFdp(prevFdp => prevFdp.filter(item => item.id !== id));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (sessionStorage.getItem("admin") !== "true") {
      navigate("/error404");
    }
    fetchFdp();
  }, [navigate, search]);

  return (
    <>
      <Sidebar />
      <div className="container_article">
        <h1>Livraison</h1>
        <div className="container_article_div">
          <div>
            <input type="text" name="searchFdp" id="searchFdp" placeholder="Rechercher..." onChange={handleSearch} />
          </div>
          <div>
            <Link to={"/add_fdp"}>
              <button className="article_btn">Ajouter des Livraison</button>
            </Link>
          </div>
        </div>
        <table className="admin">
          <thead>
            <tr>
              <th>Nom</th>
              <th>taille</th>
              <th>poids</th>
              <th>pays</th>
              <th>prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fdp.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.size}cm</td>
                <td>{item.weight}kg</td>
                <td>{item.pays}</td>
                <td>{item.price}€</td>
                <td>
                  <Link to={"/modif_fdp/" + item.id}>
                    <button>
                      <img src="/images/create.png" alt="modifier" />
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(item.id)}>
                    <img src="/images/empty-trash.png" alt="supprimer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
