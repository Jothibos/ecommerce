 import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { db, storage } from "../firebase"; // Make sure to import Firebase storage
 import { collection, addDoc } from "firebase/firestore";
 import { Form, Button, Alert } from "react-bootstrap";

 const SignUpForm = () => {
   const navigate = useNavigate();
   const [errorMessage, setErrorMessage] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [profilePicture, setProfilePicture] = useState(null);

   const handleProfilePictureChange = (event) => {
     const file = event.target.files[0];
     setProfilePicture(file);
   };

   const handleSignUp = async (event) => {
     event.preventDefault();

     const username = event.target.elements.username.value;
     const email = event.target.elements.email.value;
     const phone = event.target.elements.phone.value;
     const address = event.target.elements.address.value;

     if (!username || !email || !password || !phone || !address) {
       setErrorMessage("Please fill in all the required fields.");
       return;
     }

     if (password !== confirmPassword) {
       setErrorMessage("Passwords do not match.");
       return;
     }

     try {
       const docRef = await addDoc(collection(db, "users"), {
         username,
         email,
         phone,
         address,
       });

       console.log("Document written with ID: ", docRef.id);

       // Upload profile picture if selected
       if (profilePicture) {
         const storageRef = storage.ref();
         const profilePictureRef = storageRef.child(
           `profilePictures/${docRef.id}`
         );
         await profilePictureRef.put(profilePicture);
       }

       alert("Account created successfully!");
       navigate("/signin");
     } catch (error) {
       console.error("Error adding document: ", error);
       alert("An error occurred while creating the account.");
     }
   };

   const formStyles = {
     maxWidth: "400px",
     margin: "0 auto",
     padding: "20px",
     border: "1px solid #ccc",
     borderRadius: "8px",
     backgroundColor: "#fff",
     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
   };

   const labelStyles = {
     fontWeight: "bold",
   };

   const inputStyles = {
     width: "100%",
     padding: "10px",
     border: "1px solid #ccc",
     borderRadius: "4px",
     backgroundColor: "#f7f7f7",
     fontSize: "14px",
   };

   const buttonStyles = {
     backgroundColor: "#007bff",
     color: "#fff",
     border: "none",
     borderRadius: "4px",
     padding: "10px 20px",
     fontSize: "16px",
     cursor: "pointer",
   };

   const alertStyles = {
     marginTop: "10px",
   };

   return (
     <div style={formStyles}>
       <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
         Create an Account
       </h2>
       <Form onSubmit={handleSignUp}>
         <Form.Group controlId="username">
           <Form.Label style={labelStyles}>Username</Form.Label>
           <Form.Control
             style={inputStyles}
             type="text"
             name="username"
             placeholder="Username"
           />
         </Form.Group>
         <Form.Group controlId="email">
           <Form.Label style={labelStyles}>Email ID</Form.Label>
           <Form.Control
             style={inputStyles}
             type="email"
             name="email"
             placeholder="Email ID"
           />
         </Form.Group>
         <Form.Group controlId="password">
           <Form.Label style={labelStyles}>Password</Form.Label>
           <Form.Control
             style={inputStyles}
             type="password"
             name="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
         </Form.Group>
         <Form.Group controlId="confirmPassword">
           <Form.Label style={labelStyles}>Confirm Password</Form.Label>
           <Form.Control
             style={inputStyles}
             type="password"
             name="confirmPassword"
             placeholder="Confirm Password"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
           />
         </Form.Group>
         <Form.Group controlId="phone">
           <Form.Label style={labelStyles}>Phone No</Form.Label>
           <Form.Control
             style={inputStyles}
             type="tel"
             name="phone"
             placeholder="Phone No"
           />
         </Form.Group>
         <Form.Group controlId="address">
           <Form.Label style={labelStyles}>Address</Form.Label>
           <Form.Control
             style={inputStyles}
             type="text"
             name="address"
             placeholder="Address"
           />
         </Form.Group>
         <Form.Group controlId="profilePicture">
           <Form.Label style={labelStyles}>Profile Picture</Form.Label>
           <Form.Control
             type="file"
             accept="image/*"
             onChange={handleProfilePictureChange}
           />
         </Form.Group>
         <Button style={buttonStyles} variant="primary" type="submit">
           Create Account
         </Button>
       </Form>
       {errorMessage && (
         <Alert style={alertStyles} variant="danger">
           {errorMessage}
         </Alert>
       )}
     </div>
   );
 };

 export default SignUpForm;
