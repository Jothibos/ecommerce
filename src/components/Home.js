 import React from "react";
 import ProductList from "./ProductList";

 const Home = ({ products, addToCart }) => {
   return (
     <div className="home">
       <h2>Welcome to Our Online Store</h2>
       <p>Explore our wide range of products:</p>
       <ProductList products={products} addToCart={addToCart} />
     </div>
   );
 };

 export default Home;