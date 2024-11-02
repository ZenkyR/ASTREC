import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "./search";

export const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [isHoveringCart, setIsHoveringCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [cartLength, setCartLength] = useState(0);
  const connexion = sessionStorage.getItem("connexion");

  const cartItems = JSON.parse(localStorage.getItem("cart"));
  
  useEffect(() => {
    setTimeout(() => {
      const calculateQuantities = () => {
        setCartLength(cartItems.length);
        const newQuantities = {};
        cartItems.forEach((article) => {
          newQuantities[article.id] = (newQuantities[article.id] || 0) + 1;
        });
        
        setQuantities(newQuantities);
      };
      
      calculateQuantities();
    }, 1000);
  }, [cartItems]);


  const uniqueCart = Array.from(
    new Set(cartItems.map((article) => article.id))
  );

  const handleCartMouseEnter = () => {
    setShowCart(true);
    setIsHoveringCart(true);
  };

  const handleCartMouseLeave = () => {
    if (!isHoveringCart) {
      setShowCart(false);
    }
    setIsHoveringCart(false);
  };

  const handleCartContentMouseEnter = () => {
    setIsHoveringCart(true);
  };

  const handleCartContentMouseLeave = () => {
    setIsHoveringCart(false);
  };

  const cartTotalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <header>
      <div className="container_nav">
        <div className="logo">
          <Link to="/">
            <img src="/logo_vert.png" alt="LOGO" />
          </Link>
        </div>

        <div className="search">
          <Search />
        </div>
        <div className="nav">
          <Link to="/category">
            <div className="nav_one">Categories</div>
          </Link>
          <div className="nav_three">À Propos</div>
        </div>
        <div className="nav_button">
          <div className="cart-wrapper">
            <Link
              style={{ position: "relative" }}
              to="/panier"
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <img src="/card.png" alt="panier" />
              {cartItems.length > 0 && (
                <div className="cart-badge">{cartItems.length}</div>
              )}
            </Link>

            {showCart && (
              <div
                className="cart-hover"
                onMouseEnter={handleCartContentMouseEnter}
                onMouseLeave={handleCartContentMouseLeave}
              >
                <div className="cart-hover-title">Panier</div>
                <div className="cart-hover-content">
                  {uniqueCart.map((articleId) => {
                    const article = cartItems.find(
                      (article) => article.id === articleId
                    );
                    return (
                      <div key={article.id} className="cart-hover-article">
                        <Link to={"/detail/" + article.id}>
                          <div style={{display: 'flex',}}>
                            <img src={article.img[0]} alt="img" />
                            <div style={{fontSize: '14px',}}>
                            <h2>{article.name}</h2>
                            <h2>prix: {article.price}€</h2>
                            <h2>quantité: {quantities[article.id] || 0}</h2>
                            </div>
                          </div>
                          <div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}

                  <div className="cart-hover-total" style={{fontSize: '12px',}}>
                    <h2>Nombre d'article : {cartLength}</h2>
                    <h2>Frais de port : 0€</h2>
                    <h2>Total : {cartTotalPrice}€</h2>
                    <Link to="/panier">
                      <button>Voir le panier</button>
                    </Link>
                    <Link to="/panier">
                      <button>Commander</button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {connexion === "true" ? (
            <Link to="/profil">
              <img src="/profil.png" alt="profil" />
            </Link>
          ) : (
            <Link to="/account">
              <img src="/profil.png" alt="profil" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
