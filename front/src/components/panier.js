import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

export const Panier = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [cartLength, setCartLength] = useState(0);
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const modalStyles = {
    content: {
      width: "20%", // 200px convertis en % (ajustez selon vos besoins)
      height: "20%", // 200px convertis en % (ajustez selon vos besoins)
      top: "50%", // Le pop-up sera centré verticalement
      left: "50%", // Le pop-up sera centré horizontalement
      transform: "translate(-50%, -50%)", // Centre le pop-up parfaitement
    },
  };

  // État pour contrôler l'ouverture/fermeture du pop-up
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const calculateQuantities = () => {
      setCartLength(cart.length);
      const newQuantities = {};
      cart.forEach((article) => {
        setPrice((price) => price + article.price);
        newQuantities[article.id] = (newQuantities[article.id] || 0) + 1;
      });

      setQuantities(newQuantities);
    };

    calculateQuantities();
  }, [cart]);

  const uniqueCart = Array.from(new Set(cart.map((article) => article.id)));

  // Fonction pour ouvrir le pop-up de connexion
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Fonction pour fermer le pop-up de connexion
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Logique pour gérer le paiement
  const handlePayment = () => {
    // Vérifiez si l'utilisateur est connecté en utilisant sessionStorage.getItem
    const isConnected = sessionStorage.getItem("connexion");

    if (isConnected === "true") {
      // Utilisateur connecté, rediriger vers la page de paiement immédiatement
      // Remplacez le chemin '/paiement' par le chemin réel de votre page de paiement
      navigate("/paiement");
    } else {
      // Utilisateur non connecté, afficher le pop-up de connexion
      openLoginModal();
  
      // Attendre 15 secondes (15000 millisecondes) avant de rediriger vers la page de paiement
      setTimeout(() => {
        // Remplacez le chemin '/paiement' par le chemin réel de votre page de paiement
        navigate("/paiement")
      }, 3000);
    }
  };
  return (
    <>
      <div className="title">
        <h1>Panier</h1>
      </div>
      <div className="panier_container">
        <div className="overflow">
          <div className="container_article_panier">
            {uniqueCart.map((articleId) => {
              const article = cart.find((article) => article.id === articleId);
              return (
                <div key={article.id} className="panier_article">
                  <Link to={"/detail/" + article.id}>
                    <div>
                      <img src={article.img[0]} alt="img" />
                    </div>
                  </Link>
                  <div>
                    <h2>titre: {article.name}</h2>
                    <h2>prix: {article.price}€</h2>
                    <h2>quantité: {quantities[article.id] || 0}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pay_panier">
          <h2>récap</h2>
          <div>
            <h3>Articles : {cartLength}</h3>
            <h3>frais de livraison :</h3>
            <h3>Total : {price}€</h3>
          </div>

          <div>
            <label htmlFor="cp">Avez vous un code de reduction</label>
          </div>
          <input type="text" id="cp" placeholder="code promo" />

          <div>
            <label htmlFor="livraison">Livraison par</label>
          </div>
          <input type="text" id="livraison" placeholder="rien" />

          <div>
            {/* Bouton pour ouvrir le pop-up de connexion */}
            <button onClick={handlePayment}>Payer</button>
          </div>
        </div>
      </div>

      {/* Pop-up de connexion */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        style={modalStyles} // Applique les styles CSS au pop-up
      >
        {/* Contenu du pop-up de connexion (ajoutez ici vos formulaires de connexion) */}
        <Link to="/account">Connectez-Vous / Inscrivez-Vous</Link>
        {/* Ajoutez ici vos formulaires de connexion ou utilisez votre composant de connexion existant */}
        {/* Exemple de bouton de fermeture du pop-up */}
        <button onClick={closeLoginModal}>Fermer</button>
      </Modal>
    </>
  );
};
