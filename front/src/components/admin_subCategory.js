import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "./Sidebar";

export const AdminSubCategory = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("admin") !== "true") {
      navigate("/error404");
    }
    fetchSubCategories();
  }, [navigate, id]);

  const fetchSubCategories = () => {
    axios
      .get(`https://localhost:8000/sub/category/${id}`)
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (categoryId) => {
    axios
      .delete("https://localhost:8000/subCategory/delete/" + categoryId)
      .then((res) => {
        console.log(res.data);
        fetchSubCategories();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Sidebar />
      <div className="container_article">
        <h1>Sous Catégories</h1>
        <div className="container_article_div">
          <Link to={"/add_categories"}>
            <button className="article_btn">Ajouter une catégorie</button>
          </Link>
        </div>
        <table className="admin">
          <thead>
            <tr>
              <th>Nom de la sous-catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCategory) => (
              <tr key={subCategory.id}>
                <td>
                    {subCategory.name}
                </td>
                <td>
                  <Link to={"/modif_subCategory/" + subCategory.id}>
                    <button>
                      <img src="/images/create.png" alt="modifier" />
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(subCategory.id)}>
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
