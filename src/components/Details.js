import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams(); // Get the ID from the URL parameters
  const menu_url = "http://localhost:9000/products";
  const [pizza, setPizza] = useState(null); // State to hold the filtered pizza
  const [pizzaList, setPizzaList] = useState([]); // State to hold the fetched pizza list
console.log(pizza)
  // Function to add pizza to the cart
  const addToCartHandler = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.filter((el) => el.id === pizza.id);

    if (found.length !== 0) {
      cart.forEach((el) => {
        if (el.id === pizza.id) el.quantity++;
      });
    } else {
      cart.push({ ...pizza, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Fetch the pizza list and filter it by the provided ID
  useEffect(() => {
    const fetchData = async () => {

        const response = await fetch(menu_url);
        const data = await response.json();
        setPizzaList(data); // Set the full pizza list
        const filteredPizza = pizzaList.find((el) => el.id == id); // Find the pizza by ID
        setPizza(filteredPizza); // Set the filtered pizza
    };

    fetchData();
  }, ); // Run the effect when `id` or `menu_url` changes

  if (!pizza) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div>
      <div className="photo">
        <img src={pizza.img} alt="photo" width="300" height="300" />
      </div>
      <div className="info">
        <h3>{pizza.name}</h3>
        <h3>{pizza.category}</h3>
        <p>{pizza.topping}</p>
        <h4 className="price">{pizza.price}</h4>
        <h4 className="rank">{pizza.rank}</h4>
        <button className="btn btn-primary" onClick={addToCartHandler}>
          Order
        </button>
      </div>
    </div>
  );
}

export default Details;
