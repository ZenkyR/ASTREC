import React, { useState } from 'react';

export const Paiement = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isCardSaved, setIsCardSaved] = useState(false); // État pour suivre si la carte est enregistrée

  const handlePayment = () => {
    if (isCardSaved) {
      alert('Paiement effectué avec succès !');
    } else {
      alert('Veuillez d\'abord enregistrer la carte.');
    }
  };

  const handleSaveCard = () => {
    // Vérifier si toutes les informations de la carte sont remplies
    if (cardNumber && cardName && expiryDate && cvv) {
      setIsCardSaved(true); // Marquer la carte comme enregistrée
      alert('Carte enregistrée avec succès !');
    } else {
      alert('Veuillez remplir toutes les informations de la carte avant de l\'enregistrer.');
    }
  };

  return (
    <>
      <div className="MainContainer">
        <h1>Page de Paiement</h1>
        <form>
          <div className="FormElement">
            <label htmlFor="cardNumber">Numéro de Carte</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="FormElement">
            <label htmlFor="cardName">Nom sur la Carte</label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="FormElement">
            <label htmlFor="expiryDate">Date d'Expiration</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className="FormElement">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
            />
          </div>
        </form>
      </div>
      <button type="button" onClick={handleSaveCard} className="SaveCardButton">
        Enregistrer la Carte
      </button>
      <button type="button" onClick={handlePayment} className="PaymentButton" disabled={!isCardSaved}>
        Payer
      </button>
    </>
  );
};