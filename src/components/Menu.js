import image1 from "../images/pizza-3.jpg"
import image2 from "../images/pizza-1.jpg"
import image3 from "../images/pizza-2.jpg"
import Card from "./Card";
import '../compoenents/menu.css'
import { useEffect, useState } from "react";

function Menu (){
  const menu_url = "http://localhost:9000/products";
 const [pizza_list,setpizza] = useState([]);
 const [shown,setshown] = useState([]);
//  const [categories, setCategories] = useState([]);

const categories = ["Pizza","cola"]

/*
pizza list will be equal the data from api
*/ 

 const getProducts = () => {
  fetch(menu_url)
    .then((res)=> res.json())
    .then((date)=>setshown(date));

 }
const getall = (catName) => {
  setpizza(shown);
};

const getProductsInCategory = (catName) => {
  setpizza(shown.filter((el) => el.category === catName));
};


useEffect(() => {
  getProducts();
  // getCategories();
}, []);

return(
<>
<section className="menue" id="menu">
<div className="container" >

      <button onClick={() => { getall() }} className="btn btn-info"> All </button>

      {
          categories.map((cat) => {
            return (<button key={cat} onClick={() => { getProductsInCategory(cat) }} className="btn btn-info"> {cat}     </button>);
          })   
      }
      <div className="">
      {
        pizza_list.map((pizaa)=>{
          return(
            <div className="d-inline-flex p-4" key={pizaa.id}>
            <Card card = {pizaa} />
            </div>
          )
        })
      }
      </div>
      
   {/* <Card Name = "bizza2" imga = {image2} description = "loerm loermloerm loerm loerm "/> */}
   {/* <Card Name = "bizza3" imga = {image3} description = "loerm loermloerm loerm loerm "/> */}
 </div>
</section>
</>
);
}

export default Menu;