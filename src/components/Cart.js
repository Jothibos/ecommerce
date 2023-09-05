 import React from "react";
 import { useNavigate } from "react-router-dom";

 function Cart({ cartItems, removeFromCart, updateQuantity }) {
   const navigate = useNavigate();

   // Calculate the total price of items in the cart
   const calculateTotalPrice = () => {
     return cartItems
       .reduce((total, item) => {
         const price = parseFloat(item.price.replace("₹", ""));
         return total + price * item.quantity;
       }, 0)
       .toFixed(2);
   };

   // Event handler for the "Buy Now" button
   const handleBuyNow = () => {
     if (cartItems.length === 0) {
       alert("Your cart is empty. Add items to your cart before purchasing.");
     } else {
       // Show a confirmation dialog
       if (window.confirm("Are you sure you want to purchase these items?")) {
         // Set the `isPurchased` property of the purchased items to true
         cartItems.forEach((item) => {
           item.isPurchased = true;
         });

         // Remove the purchased items from the cart
         cartItems
           .filter((item) => item.isPurchased)
           .forEach((item) => {
             removeFromCart(item);
           });

         // Display a success message
         alert("Successfully purchased!");

         // Redirect to the home page or a thank you page
         navigate("/");
       }
     }
   };

   return (
     <div className="cart">
       <h2>Your Cart</h2>
       {cartItems.length === 0 ? (
         <div className="cart-empty">
           <h3>Your cart is empty</h3>
         </div>
       ) : (
         <>
           <div className="cart-items">
             {cartItems.map((item) => (
               <div className="cart-item" key={item.id}>
                 <img src={item.image} alt={item.name} />
                 <div className="cart-item-info">
                   <h3>{item.name}</h3>
                   <p>Price: {item.price}</p>
                   <p>Rating: {item.rating}</p>
                   <div className="cart-item-quantity">
                     <button onClick={() => updateQuantity(item, "decrease")}>
                       -
                     </button>
                     <span>{item.quantity}</span>
                     <button onClick={() => updateQuantity(item, "increase")}>
                       +
                     </button>
                   </div>
                   {item.isPurchased ? (
                     <p>Purchased</p>
                   ) : (
                     <button onClick={() => removeFromCart(item)}>
                       Remove from Cart
                     </button>
                   )}
                 </div>
               </div>
             ))}
           </div>
           <div className="cart-summary">
             <p>Total Products: {cartItems.length}</p>
             <p>Total Price: ₹{calculateTotalPrice()}</p>
             <button onClick={handleBuyNow}>Buy Now</button>
           </div>
         </>
       )}
     </div>
   );
 }

 export default Cart;
