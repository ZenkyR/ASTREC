import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import {InlineShareButtons} from 'sharethis-reactjs';

export const Detail = ({handleAddArticle}) => {
  const [article, setArticle] = useState([]);
  const [imgArray, setImgArray] = useState([]);
  const [partage, setPartage] = useState(false);
  const { id } = useParams();
  const [ternaireOnglet, setTernaireOnglet] = useState("desc");

  if (article.img === undefined) {
    article.img = "/no_img.png";
  }
  console.log(article);
  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/detail/" + id)
      .then((res) => {
        setArticle(res.data);
        setImgArray(res.data.img);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onglet = (event) => {
    if (event.target.name === "desc") {
      setTernaireOnglet("desc");
    }
    if (event.target.name === "fiche") {
      setTernaireOnglet("fiche");
    }
    if (event.target.name === "avis") {
      setTernaireOnglet("avis");
    }
  };

  const notation = 2.5;

  const barPourcent5 = 50;
  const barPourcent4 = 15;
  const barPourcent3 = 10;
  const barPourcent2 = 10;
  const barPourcent1 = 15;

  const path = "https://localhost:3000/detail/" + id;
  const clickPartage = () => {
    if(partage === false){
      setPartage(true);
    } else {
      setPartage(false);
    }
  }

  const sendEmail = () => {
    axios.post("https://127.0.0.1:8000/email")
      .then((response) => {
       console.log(response.data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  return (
    <>
      <div className="pop_up">
        <div className="contain_all_details">
          <div className="contain_img_name_desc">
            <div className="article_img">
              <Carousel infiniteLoop useKeyboardArrows dynamicHeight>
                {[...Array(article.img.length)].map((_, i) => (
                  <img src={imgArray[i]} alt={`img${i}`} />
                ))}
              </Carousel>
            </div>
            <div className="contain_name_desc_charac">
              <div className="article_name">
                <h3>{article.name}</h3>
              </div>
              <div className="BoxStock"></div>
              {article.stock !== 0 ? (
                <div className="ShowStock">
                  <h3>Stock : {article.stock}</h3>
                </div>
              ) : (
                <div className="ShowStock red">
                  <h3>Stock : Rupture de stock</h3>
                </div>
              )}
              {ternaireOnglet !== "desc" ? (
                <div className="hide"></div>
              ) : (
                <div className="article_desc">
                  <p>{article.desc}</p>
                </div>
              )}
              {ternaireOnglet !== "fiche" ? (
                <div className="hide"></div>
                ) : (
                  <div className="article_charac ">
                  <p>marque : {article.marque}</p>
                  <p>couleur : {article.color}</p>
                  <p>taille : {article.size}cm</p>
                  <p>poids : {article.weight}kg</p>
                  {article.bis.map((bis) => (
                    <div>
                      <p>{bis.name} : {bis.value}</p>
                    </div>
                  ))}
                </div>
              )}
              {ternaireOnglet !== "avis" ? (
                <div className="hide"></div>
                ) : (
                  <div className="article_avis">
                  <div className="avis_client">
                    <p>Avis Client</p>
                    <div className="rating">
                      <h2>{notation}</h2>
                      {notation === 0 ? (
                        <div className="star">
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                        </div>
                      ) : notation >= 0.1 && notation <= 0.9 ? (
                        <div className="star">
                          <img src="/demi_etoile.png" alt="demi étoile" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                        </div>
                      ) : notation === 1 ? (
                        <div className="star">
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                        </div>
                      ) : notation >= 1.1 && notation <= 1.9 ? (
                        <div className="star">
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/demi_etoile.png" alt="demi étoile" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                        </div>
                      ) : notation === 2 ? (
                        <div className="star">
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                        </div>
                      ) : notation >= 2.1 && notation <= 2.9 ? (
                        <div className="star">
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/demi_etoile.png" alt="demi étoile" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                        </div>
                      ) : notation === 3 ? (
                        <div className="star">
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                        </div>
                      ) : notation >= 3.1 && notation <= 3.9 ? (
                        <div className="star">
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/demi_etoile.png" alt="demi étoile" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                        </div>
                      ) : notation === 4 ? (
                        <div className="star">
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                        </div>
                      ) : notation >= 4.1 && notation <= 4.9 ? (
                        <div className="star">
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/demi_etoile.png" alt="demi étoile" />
                        </div>
                      ) : notation === 5 ? (
                        <div className="star">
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                          <img src="/etoile.png" alt="étoile" />
                        </div>
                      ) : (
                        <div className="star">
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                          <img src="/no_etoile.png" alt="étoile vide" />
                        </div>
                      )}
                      <Link to={"/avis/" + article.id}>
                        <h6>1315 avis</h6>
                      </Link>
                    </div>
                  </div>
                  <div className="contain_bar_progress_button">
                    <div className="contain_bar_progress">
                      <div className="bar_pourcent">
                        <h5>5</h5>
                        <div className="bar_progress">
                          <div
                            className="progress5"
                            style={{ width: barPourcent5 + "%" }}
                          ></div>
                        </div>
                        <p>{barPourcent5}%</p>
                      </div>
                      <div className="bar_pourcent">
                        <h5>4</h5>
                        <div className="bar_progress">
                          <div
                            className="progress4"
                            style={{ width: barPourcent4 + "%" }}
                          ></div>
                        </div>
                        <p>{barPourcent4}%</p>
                      </div>
                      <div className="bar_pourcent">
                        <h5>3</h5>
                        <div className="bar_progress">
                          <div
                            className="progress3"
                            style={{ width: barPourcent3 + "%" }}
                          ></div>
                        </div>
                        <p>{barPourcent3}%</p>
                      </div>
                      <div className="bar_pourcent">
                        <h5>2</h5>
                        <div className="bar_progress">
                          <div
                            className="progress2"
                            style={{ width: barPourcent2 + "%" }}
                          ></div>
                        </div>
                        <p>{barPourcent2}%</p>
                      </div>
                      <div className="bar_pourcent">
                        <h5>1</h5>
                        <div className="bar_progress">
                          <div
                            className="progress1"
                            style={{ width: barPourcent1 + "%" }}
                          ></div>
                        </div>
                        <p>{barPourcent1}%</p>
                      </div>
                    </div>
                    <Link to={"/avis/" + article.id}>
                      <button>
                        <h3>Voir tout les avis</h3>
                      </button>
                    </Link>
                  </div>
                </div>
              )}
              <div className="onglet_article">
                {ternaireOnglet !== "desc" ? (
                  <button className="button_desc" name="desc" onClick={onglet}>
                    Description
                  </button>
                ) : (
                  <button
                  className="button_desc use"
                  name="desc"
                  onClick={onglet}
                  >
                    Description
                  </button>
                )}
                {ternaireOnglet !== "fiche" ? (
                  <button
                  className="button_fiche"
                  name="fiche"
                  onClick={onglet}
                  >
                    Fiche technique
                  </button>
                ) : (
                  <button
                  className="button_fiche use"
                  name="fiche"
                    onClick={onglet}
                  >
                    Fiche technique
                  </button>
                )}
                {ternaireOnglet !== "avis" ? (
                  <button className="button_avis" name="avis" onClick={onglet}>
                    Avis
                  </button>
                ) : (
                  <button
                  className="button_avis use"
                  name="avis"
                  onClick={onglet}
                  >
                    Avis
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="contain_prix_achat">
            <div className="article_price">
              <h2>{article.price}€</h2>
            </div>
            {article.stock !== 0 ? (
              <>
                <div className="article_achat">
                  <Link to={"/achat/" + article.id}>
                    <button>
                      <h3>Achat cet article</h3>
                    </button>
                  </Link>
                </div>
                <div className="article_panier">
                  <button
                  onClick={ () => handleAddArticle(article)}>
                    <h3>Ajout au panier</h3>
                  </button>
                </div>
              </>
            ) : (
              <>
              <div className="article_stock">
                <button onClick={sendEmail}>
                  <h3>Prévenez-moi quand le produit est disponible</h3>
                </button>
              </div>
            </>
          )}
          </div>
        </div>
        <div className="view_counter">
          <img src="/partager.png" alt="img partage" id="partage" onClick={clickPartage}/>
          <p>{article.view}</p>
          <img
            src="/images/millenium-eye.png"
            alt="L'oeil du millénium de yu-gi-oh"
          />
        </div>
      </div>
      <div>
      { partage !== true
      ?
        <div></div>
      :
      <div className="popup-partage">
        <div>
        <div id='partage-row'>
            <h1>Partager</h1>
            <p onClick={clickPartage}>X</p>
        </div>
          <InlineShareButtons
            config={{
                alignment: 'center',  // alignment of buttons (left, center, right)
                color: 'social',      // set the color of buttons (social, white)
                enabled: true,        // show/hide buttons (true, false)
                font_size: 16,        // font size for the buttons
                labels: 'cta',        // button labels (cta, counts, null)
                language: 'fr',       // which language to use (see LANGUAGES)
                networks: [           // which networks to include (see SHARING NETWORKS)
                'email',
                'facebook',
                'twitter'
              ],
              padding: 12,          // padding within buttons (INTEGER)
              radius: 4,            // the corner radius on each button (INTEGER)
              show_total: true,
              size: 40,             // the size of each button (INTEGER)
              
              url: path, // (defaults to current url)
              image: 'http://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
              description: 'custom text',       // (defaults to og:description or twitter:description)
              title: 'Regarder cette article',            // (defaults to og:title or twitter:title)
              message: 'custom email text',     // (only for email sharing)
              subject: 'custom email subject',  // (only for email sharing)
              username: '' // (only for twitter sharing)
          }}
          />
        </div>
      </div>
      }

      </div>
    </>
  );
};
