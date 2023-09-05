  import React, { useState } from "react";
  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
  import Header from "./components/Header";
  import ProductList from "./components/ProductList";
  import Cart from "./components/Cart";
  import SignUpForm from "./components/SignUpForm";
  import SignInForm from "./components/SignInForm";
  import productsData from "./data/products";
  import UserProfile from "./components/UserProfile";
  import { ToastContainer, toast } from "react-toastify";
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
        const newItem = { ...product, quantity: 1 };
        setCartItems([...cartItems, newItem]);
      }

      // Show notification when an item is added to the cart
      toast.success(`${product.name} added to cart`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    };

    const removeFromCart = (product) => {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
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
                <ProductList
                  products={filteredProducts}
                  addToCart={addToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
              }
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    );
  }

  export default App;