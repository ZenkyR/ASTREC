import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Breadscrumbs from "./Breadscrumbs";

export const ArticleByCategory = () => {
    const [listArticle, setListArticle] = useState([]);
    const [filters, setFilters] = useState([]);
    const [tri, setTri] = useState("pertinence");
    const [prixMin, setPrixMin] = useState(null);
    const [prixMax, setPrixMax] = useState(null);
    const [msg, setMsg] = useState("");
    const { id } = useParams();

    if (listArticle.img === undefined) {
      listArticle.img = "/no_img.png";
    }

    const fetchListArticles = () => {
      axios
        .get("https://localhost:8000/article/category/" + id)
        .then((res) => {
          if(res.data[0]) {
            setListArticle(res.data);
          } else {
            setMsg("Pas d'article disponible pour le moment");
          }
        })
        .catch((err) => console.log(err));
    };

    const handleTri = (e) => {
      setTri(e.target.value)
    }

    const handleFilter = (e) => {
      if(e.target.checked) {
        setFilters([...filters, e.target.id])
      } else {
        setFilters(filters.filter((fil) => fil != e.target.id))
      }
    }

    const handlePrixMin = (e) => {
      setPrixMin(e.target.value)
    }
    const handlePrixMax = (e) => {
      setPrixMax(e.target.value)
    }

    const trifilter = () => {
      axios.post("https://127.0.0.1:8000/filters", {tri: tri, filters: filters, prixMin: prixMin, prixMax: prixMax})
           .then((res) => {
            if(res.data[0]) {
              setListArticle(res.data);
              setMsg("");
            } else {
              setMsg("Pas d'article disponible pour le moment");
            }
           })
           .catch((err) => console.log(err));
    }

    useEffect(() => {
      fetchListArticles();
    }, []);
    useEffect(() => {
      trifilter();
    }, [tri, filters, prixMin, prixMax]);

    return (
      <div>
        <div className="article_sub_categ_navbar">
          <div>
            <Breadscrumbs
              items={[
                { path: "/", breadcrumb: "Home" },
                { path: "/category", breadcrumb: "Category" },
                { path: "/category/:id", breadcrumb: "a" },
              ]}
            />
          </div>
          <div className="article_sub_categ_tri">
            <select name="article_sub_categ_tri" id="article_sub_categ_tri" onClick={handleTri}>
              <option value="pertinence">Pertinence</option>
              <option value="recent">Plus récent</option>
              <option value="ancien">Plus ancien</option>
              <option value="pluscher">Prix les plus chers</option>
              <option value="moinscher">Prix les moins chers</option>
            </select>
          </div>
        </div>
        <div className="article_sub_categ">
          <div className="article_sub_categ_filters">
            <div className="article_sub_categ_filter">
              <h3>Prix :</h3>
              <div className="filterPrix">
                <div>
                  <label htmlFor="prixMin">Min :</label>
                  <input type="number" name="prixMin" id="prixMin" onChange={handlePrixMin} />
                </div>
                <div><p>-</p></div>
                <div>
                  <label htmlFor="prixMax">Max :</label>
                  <input type="number" name="prixMax" id="prixMax" onChange={handlePrixMax} />
                </div>
              </div>
            </div>
            <div className="article_sub_categ_filter">
              <h3>Disponible :</h3>
              <div>
                <div>
                  <input type="checkbox" name="dispoyes" id="dispoyes" onClick={handleFilter} />
                  <label htmlFor="dispoyes">Disponible</label>
                </div>
                <div>
                  <input type="checkbox" name="dispono" id="dispono" onClick={handleFilter} />
                  <label htmlFor="dispono">En rupture</label>
                </div>
              </div>
            </div>
            <div className="article_sub_categ_filter">
              <h3>Couleur :</h3>
              <div>
                <div>
                  <input type="checkbox" name="colorred" id="colorred" onClick={handleFilter} />
                  <label htmlFor="colorred">Rouge</label>
                </div>
                <div>
                  <input type="checkbox" name="colorblue" id="colorblue" onClick={handleFilter} />
                  <label htmlFor="colorblue">Bleu</label>
                </div>
                <div>
                  <input type="checkbox" name="colorgreen" id="colorgreen" onClick={handleFilter} />
                  <label htmlFor="colorgreen">Vert</label>
                </div>
                <div>
                  <input type="checkbox" name="coloryellow" id="coloryellow" onClick={handleFilter} />
                  <label htmlFor="coloryellow">Jaune</label>
                </div>
              </div>
            </div>
            <div className="article_sub_categ_filter">
              <h3>Type :</h3>
              <div>
                <div>
                  <input type="checkbox" name="typeA" id="typeA" onClick={handleFilter} />
                  <label htmlFor="typeA">A</label>
                </div>
                <div>
                  <input type="checkbox" name="typeB" id="typeB" onClick={handleFilter} />
                  <label htmlFor="typeB">B</label>
                </div>
                <div>
                  <input type="checkbox" name="typeC" id="typeC" onClick={handleFilter} />
                  <label htmlFor="typeC">C</label>
                </div>
              </div>
            </div>
          </div>
          <div className="article_sub_categ_articles">
            {msg !== "" ?
              <div>{msg}</div>
              :
              <>
                {listArticle.map((article) => (
                  <Link to={"/detail/" + article.id} key={article.id}>
                  <div key={article.id} className="article_box">
                    <div className="article_box_img">
                      <img src={article.img} alt="img" />
                    </div>
                    <div className="article_box_desc">
                      <h2>{article.title}</h2>
                      <h2>Prix: {article.price}€</h2>
                      <h2>Stock: {article.stock}</h2>
                    </div>
                  </div>
                  </Link>
                ))}
              </>
            }
          </div>
        </div>
      </div>
    )
  }