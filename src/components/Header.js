 import React, { useState } from "react";
 import { Link } from "react-router-dom";

 const Header = ({ handleSearch }) => {
   const userData = JSON.parse(localStorage.getItem("user"));
   console.log("userData:", userData);
   const [searchTerm, setSearchTerm] = useState("");

   const handleChange = (e) => {
     setSearchTerm(e.target.value);
   };

   const handleSubmit = (e) => {
     e.preventDefault();
     handleSearch(searchTerm);
   };

   return (
     <header>
       {/* <div className="profile-image">
         {userData ? (
           <img src={userData.profileImage} alt="Profile" />
         ) : (
           "Profile Image"
         )}
       </div> */}
       <nav>
         <ul>
           <li>
             <Link to="/">Home</Link>
           </li>
           <li>
             <Link to="/cart">Cart</Link>
           </li>
         </ul>
       </nav>
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

       <div className="auth-buttons">
         <Link to="/signin">Sign In</Link>
         <Link to="/signup">Sign Up</Link>
       </div>
     </header>
   );
 };

 export default Header;
