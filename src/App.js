 import React, { useState } from "react";
 import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import Header from "./components/Header";
 import Footer from "./components/Footer";
 import ProductList from "./components/ProductList";
 import Cart from "./components/Cart";
 import SignUpForm from "./components/SignUpForm";
 import SignInForm from "./components/SignInForm";
 import productsData from "./data/products";
 import { ToastContainer, toast } from "react-toastify"; // Add 'toast' import
 import "react-toastify/dist/ReactToastify.css";
 import "./App.css";

 function App() {
   const [cartItems, setCartItems] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

   const addToCart = (product) => {
     const existingItem = cartItems.find((item) => item.id === product.id);

     if (existingItem) {
       setCartItems((prevItems) =>
         prevItems.map((item) =>
           item.id === product.id
             ? { ...item, quantity: item.quantity + 1 }
             : item
         )
       );
     } else {
       setCartItems([...cartItems, { ...product, quantity: 1 }]);
     }

     // Show notification when item is added to cart
     toast.success(`${product.name} added to cart`, {
       position: toast.POSITION.BOTTOM_RIGHT,
     });
   };

   const removeFromCart = (product) => {
     setCartItems(cartItems.filter((item) => item.id !== product.id));
   };

   const updateQuantity = (product, action) => {
     setCartItems((prevItems) =>
       prevItems.map((item) =>
         item.id === product.id
           ? {
               ...item,
               quantity:
                 action === "increase" ? item.quantity + 1 : item.quantity - 1,
             }
           : item
       )
     );
   };

   const handleSearch = (searchTerm) => {
     setSearchTerm(searchTerm);
   };

   const filteredProducts = productsData.filter((product) =>
     product.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
     <Router>
       <div className="App">
         <Header handleSearch={handleSearch} cartItems={cartItems} />
         <Routes>
           <Route
             path="/"
             element={
               <ProductList products={filteredProducts} addToCart={addToCart} />
             }
           />
           <Route
             path="/cart"
             element={
               <Cart
                 cartItems={cartItems}
                 removeFromCart={removeFromCart}
                 updateQuantity={updateQuantity}
               />
             }
           />
           <Route path="/signin" element={<SignInForm />} />
           <Route path="/signup" element={<SignUpForm />} />
         </Routes>
       </div>
       <Footer />
       <ToastContainer />
     </Router>
   );
 }

 export default App;
