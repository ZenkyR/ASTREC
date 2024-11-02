import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Article = () => {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);

  const fetchArticles = () => {
    axios
      .post("https://localhost:8000/article", {search: search})
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleDelete = (articleId) => {
    axios
      .delete("https://localhost:8000/article/delete/" + articleId)
      .then((res) => {
        console.log(res.data);
        fetchArticles();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchArticles();
  }, [search]);

  return (
    <>
      <Sidebar />
      <div className="container_article">
        <h1>Article</h1>
        <div className="header_article">
          <div>
            <input type="text" name="searchArticle" id="searchArticle" placeholder="Rechercher..." onChange={handleSearch} />
          </div>
          <div>
            <Link to={"/add_article"}>
              <button className="article_btn">Ajouter un article</button>
            </Link>
          </div>
        </div>

        <div className="container_article_div">
          <table className="admin">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.name}</td>
                  <td>{article.price}€</td>
                  <td>{article.stock}</td>
                  <td>
                    <Link to={"/modif_article/" + article.id}>
                      <button>
                        <img src="/images/create.png" alt="modifier" />
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(article.id)}>
                      <img src="/images/empty-trash.png" alt="supprimer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
