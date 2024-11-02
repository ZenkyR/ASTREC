import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "./Sidebar";

export const AdminCategory = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios
      .post("https://127.0.0.1:8000/category", {search: search})
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleDelete = (categoryId) => {
    axios
      .delete("https://localhost:8000/category/delete/" + categoryId)
      .then((res) => {
        console.log(res.data);
        fetchCategories();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin") !== "true") {
      navigate("/error404");
    }
    fetchCategories();
  }, [navigate, search]);

  return (
    <div>
      <Sidebar />
      <div className="container_article">
        <h1>Categories</h1>
        <div className="container_article_div">
          <div>
            <input type="text" name="searchCategory" id="searchCategory" placeholder="Rechercher..." onChange={handleSearch} />
          </div>
          <div>
            <Link to={"/add_categories"}>
              <button className="article_btn">Ajouter une catégorie</button>
            </Link>
          </div>
        </div>
        <table className="admin">
          <thead>
            <tr>
              <th>Nom de la catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>
                  <Link to={"/admin_subCategory/" + category.id}>
                    {category.name}
                  </Link>
                </td>
                <td>
                  <Link to={"/modif_category/" + category.id}>
                    <button>
                      <img src="/images/create.png" alt="modifier" />
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(category.id)}>
                    <img src="/images/empty-trash.png" alt="supprimer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
