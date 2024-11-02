import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("search", search);
    navigate("/search");
  };

  useEffect(() => {
    if (search === "") {
      return;
    }

    axios
      .get(`https://localhost:8000/search/${search}`)
      .then((res) => {
        if (search.length > 1) {
          setResult(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  useEffect(() => {
    setSearch("");
  }, [location]);

  return (
    <>
      <div>
        <form onChange={handleSearch} onSubmit={handleSubmit}>
          <input type="text" placeholder="Rechercher" />
        </form>
      </div>

      <div>
        <div className="search_container">
          <div>
            {result && search.length > 1 ? (
              result.slice(0, 4).map((article) => (
                <table key={article.id} className="search_table">
                  <Link key={article.id} to={`/detail/${article.id}`}>
                    <tbody>
                      <tr>
                        <td>
                          <img src={article.img[0]} alt={article.name} />
                        </td>
                        <td className="desc-search-table">
                          <p>{article.title}</p>
                          <p>Prix: {article.price} €</p>
                          <p className="stock-search">Stock: {article.stock}</p>
                        </td>
                      </tr>
                    </tbody>
                  </Link>
                </table>
              ))
            ) : search.length > 1 ? (
              <>
                <table className="radius">
                  <tbody>
                    <tr>
                      <th>
                        <div>pas d'article trouvé</div>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}
            {result && search.length > 1 ? (
              <>
                <h3>
                <Link to="/search">Voir plus</Link>
              </h3>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
