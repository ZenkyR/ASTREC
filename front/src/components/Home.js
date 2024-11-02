import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";


export const Home = () => {
  const [category, setCategory] = useState([]);
  const [article, setArticle] = useState([]);
  const [descHome, setDescHome] = useState(0);
  const [newArticle, setNewArticle] = useState([]);

  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/category")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/article")
      .then((res) => setArticle(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/article/new")
      .then((res) => setNewArticle(res.data))
      .catch((err) => console.log(err));
  }, []);

  const afficheDesc = (event) => {
    const id = parseInt(event.currentTarget.classList[0]);
    setDescHome(id);
  };
  const hideDesc = () => {
    setDescHome(0);
  };
  if(newArticle){
    console.log(newArticle);
  }
  return (
    <>

      <div className="carousel-container">
        <Carousel
          autoPlay
          interval={3000}
          infiniteLoop
          useKeyboardArrows
          dynamicHeight
        >
          <Link to={"/newArticle"}>
            <div>
                <img src="/Carousel/new.png" alt="" />
            </div>
          </Link>
          <Link to={"/promotionArticle"}>
            <div>
                <img src="/Carousel/Promo.png" alt="" />
            </div>
          </Link>
            <div>
              <img src="/Carousel/baniere.png" alt="" />
            </div>
        </Carousel>
      </div>

      <div className="title">
      </div>
      <p className="tendance_home">Tendance</p>
      <div className="line"></div>
      <div className="contain_article_home">
        {article.slice(0, 4).map((article_name) => (
          <div key={article_name.id}>
            <Link to={"/detail/" + article_name.id}>
              <div
                className={article_name.id + " abox"}
                onMouseOver={afficheDesc}
                onMouseOut={hideDesc}
              >
                <div className={article_name.id + " bin"}>
                  {article_name.stock !== 0 ? (
                    <img src={article_name.img[0]} alt="ArticleImg" />
                  ) : (
                    <img
                      className="HoverCover"
                      src={article_name.img[0]}
                      alt="ArticleImg"
                    />
                  )}

                  <h2 className={article_name.id}>{article_name.name}</h2>
                  <h2 className="PrixHome">{article_name.price}€</h2>

                  {article_name.stock !== 0 ? (
                    <div className="ShowStockHome">
                      <h3>Stock : {article_name.stock}</h3>
                    </div>
                  ) : (
                    <div className="ShowStockHome red">
                      <h3>Stock : Rupture de stock</h3>
                    </div>
                  )}
                </div>

                {descHome !== article_name.id ? (
                  <p className="hide"></p>
                ) : (
                  <p>{article_name.desc}</p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="baniere">
        <Link to={"/promotionArticle"}>
          <h2>PROMOTION</h2>
        </Link>
      </div>
      <div className="contain_article_home">
        {article.slice(0, 4).map((article_name) => (
          <div key={article_name.id}>
            <Link to={"/detail/" + article_name.id}>
              <div
                className={article_name.id + " abox"}
                onMouseOver={afficheDesc}
                onMouseOut={hideDesc}
              >
                <div className={article_name.id + " bin"}>
                  {article_name.stock !== 0 ? (
                    <img src={article_name.img[0]} alt="ArticleImg" />
                  ) : (
                    <img
                      className="HoverCover"
                      src={article_name.img[0]}
                      alt="ArticleImg"
                    />
                  )}

                  <h2 className={article_name.id}>{article_name.name}</h2>
                  <h2 className="PrixHome">{article_name.price}€</h2>

                  {article_name.stock !== 0 ? (
                    <div className="ShowStockHome">
                      <h3>Stock : {article_name.stock}</h3>
                    </div>
                  ) : (
                    <div className="ShowStockHome red">
                      <h3>Stock : Rupture de stock</h3>
                    </div>
                  )}
                </div>

                {descHome !== article_name.id ? (
                  <p className="hide"></p>
                ) : (
                  <p>{article_name.desc}</p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="baniere">
        <Link to={"/newArticle"}>
          <h2>NOUVEAU</h2>
        </Link>
      </div>
      <div className="contain_article_home">
        {newArticle.slice(0, 4).map((article_name) => (
          <div key={article_name.id}>
            <Link to={"/detail/" + article_name.id}>
              <div
                className={article_name.id + " abox"}
                onMouseOver={afficheDesc}
                onMouseOut={hideDesc}
              >
                <div className={article_name.id + " bin"}>
                  {article_name.stock !== 0 ? (
                    <img src={article_name.img[0]} alt="ArticleImg" />
                  ) : (
                    <img
                      className="HoverCover"
                      src={article_name.img[0]}
                      alt="ArticleImg"
                    />
                  )}

                  <h2 className={article_name.id}>{article_name.name}</h2>
                  <h2 className="PrixHome">{article_name.price}€</h2>

                  {article_name.stock !== 0 ? (
                    <div className="ShowStockHome">
                      <h3>Stock : {article_name.stock}</h3>
                    </div>
                  ) : (
                    <div className="ShowStockHome red">
                      <h3>Stock : Rupture de stock</h3>
                    </div>
                  )}
                </div>

                {descHome !== article_name.id ? (
                  <p className="hide"></p>
                ) : (
                  <p>{article_name.desc}</p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="display-row-home">
        <p className="tendance_home">Categories</p>
        <Link to="/category">Voir plus</Link>
      </div>
      <div className="line"></div>
      <div className="display-categorie-home">
        {category.slice(0, 4).map((category_name) => (
          <div key={category_name.id}>
            <Link to={"/category/" + category_name.id}>
              <div className="contains-categorie-home">
                <div className="img-categorie-home">
                  <img src={category_name.img} alt="img" />
                </div>
                <h2>{category_name.name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="footer"></div>
    </>
  );
};
