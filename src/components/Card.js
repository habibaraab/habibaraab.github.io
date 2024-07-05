import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ card }) {
  const { id } = card;

  const addToCartHandler = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const found = cart.filter((el) => el.id === id);

    console.log(found);
    if (found.length !== 0) {
      cart.forEach((el) => {
        if (el.id === id) el.quantity++;
      });
    } else {
      cart.push({ ...card, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <div className="card">
      <div className="photo">
        <img src={card.img} width = "300px" height="300px" alt="photo" />
      </div>
      <div className="info">
        <h3>{card.name}</h3>
        <p>{card.topping}</p>
        <h4 className="price">{card.price}</h4>
        <button className="btn btn-primary" onClick={addToCartHandler}>
          Order
        </button>
        <Link to={`/product/${id}`}>
          <button className="btn btn-secondary">View Details</button>
        </Link> 
      </div>
    </div>
  );
}

export default Card;
