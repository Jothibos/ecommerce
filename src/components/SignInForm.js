 import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { Form, Button, Alert } from "react-bootstrap";

 const SignInForm = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   const handleSignIn = (event) => {
     event.preventDefault();

     if (!email || !password) {
       setErrorMessage("Please enter your email and password.");
       return;
     }

     // Perform form validation and authentication process here
     // For simplicity, we'll just show an alert message
     alert("Sign In successful!");

     // Simulate the user data after successful login
     const userData = {
       username: " ",
       profileImage: " ",
     };

     // Save user data to local storage or state management (optional)
     localStorage.setItem("user", JSON.stringify(userData));

     // Redirect to the home page after successful sign-in
     navigate("/");
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
       <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Sign In</h2>
       <Form onSubmit={handleSignIn}>
         <Form.Group controlId="email">
           <Form.Label style={labelStyles}>Email ID</Form.Label>
           <Form.Control
             style={inputStyles}
             type="email"
             placeholder="Email ID"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />
         </Form.Group>
         <Form.Group controlId="password">
           <Form.Label style={labelStyles}>Password</Form.Label>
           <Form.Control
             style={inputStyles}
             type="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
         </Form.Group>
         <Button style={buttonStyles} variant="primary" type="submit">
           Sign In
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

 export default SignInForm;
