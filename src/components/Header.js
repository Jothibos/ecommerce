  import React, { useState } from "react";
  import { Link } from "react-router-dom";

  const Header = ({ handleSearch, cartItems }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSearch(searchTerm);
    };

    return (
      <header className="header">
        {/* Navigation links */}
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart (
                {cartItems.reduce((total, item) => total + item.quantity, 0)})
              </Link>
            </li>
          </ul>
        </nav>
        {/* Search box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="button" onClick={handleSubmit}>
            Search
          </button>
        </div>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
        <div className="auth-buttons">
          <Link to="/signin" className="auth-link">
            Sign In
          </Link>
          <Link to="/signup" className="auth-link">
            Sign Up
          </Link>
        </div>
      </header>
    );
  };

  export default Header;