 import React from "react";

 function Product({ product, addToCart }) {
   const { image, name, price, rating } = product;

   return (
     <div className="product">
       <img src={image} alt={name} />
       <h3>{name}</h3>
       <p>Price: {price}</p>
       <p>Rating: {rating}</p>
       <button onClick={() => addToCart(product)}>Add to Cart</button>
     </div>
   );
 }

 export default Product;
