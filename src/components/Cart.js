 import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { db } from "../firebase"; // Update the path to match your actual file structure
 import { collection, addDoc } from "firebase/firestore";

 const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");

   const getTotalQuantity = () => {
     const totalQuantity = cartItems.reduce(
       (total, item) => total + item.quantity,
       0
     );
     return totalQuantity;
   };

   const getTotalPrice = () => {
     const totalPrice = cartItems.reduce(
       (acc, item) => acc + parseFloat(item.price) * item.quantity,
       0
     );
     return `₹${totalPrice.toFixed(2)}`;
   };

   const handleBuy = async () => {
     if (!email) {
       alert("Please enter your email before buying.");
       return;
     }

     try {
       // Save purchase details to Firestore collection
       const purchaseData = {
         email,
         items: cartItems.map((item) => ({
           id: item.id,
           name: item.name,
           price: item.price,
           quantity: item.quantity,
         })),
         timestamp: new Date().toISOString(),
       };

       // Add the purchase data to the "purchases" collection
       const docRef = await addDoc(collection(db, "purchases"), purchaseData);
       console.log("Purchase document ID: ", docRef.id);

       // Display success message and navigate to the homepage
       alert("Thank you for your purchase!");
       navigate("/");
     } catch (error) {
       console.error("Error adding purchase document: ", error);
       // Display error message to the user
       alert("An error occurred while making the purchase.");
     }
   };

   return (
     <div className="cart">
       <h2>Cart</h2>
       {cartItems.length === 0 ? (
         <p>Your cart is empty.</p>
       ) : (
         <>
           <ul>
             {cartItems.map((item) => (
               <li key={item.id}>
                 <div className="cart-item">
                   <img src={item.image} alt={item.name} />
                   <div className="item-details">
                     <p>{item.name}</p>
                     <p>Price: ₹{item.price}</p>
                     <p>Quantity: {item.quantity}</p>
                     <button onClick={() => removeFromCart(item)}>
                       Remove
                     </button>
                   </div>
                   <div className="item-quantity">
                     <button onClick={() => updateQuantity(item, "increase")}>
                       +
                     </button>
                     <button onClick={() => updateQuantity(item, "decrease")}>
                       -
                     </button>
                   </div>
                 </div>
               </li>
             ))}
           </ul>
           <div className="cart-total">
             <p>Total Items: {getTotalQuantity()}</p>
             <p>Total Price: {getTotalPrice()}</p>
             <div className="email-form">
               <input
                 type="email"
                 placeholder="Enter your email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
               />
               <button onClick={handleBuy}>Buy</button>
             </div>
           </div>
         </>
       )}
     </div>
   );
 };

 export default Cart;
