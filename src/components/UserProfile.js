 import React, { useState } from "react";

 const UserProfile = () => {
   // Use state to manage user information
   const [userInfo, setUserInfo] = useState({
     profilePicture: "****",
     userName: "*****",
     email: "********",
     password: "********",
     phoneNumber: "**********",
     address: "*****,*****,****",
   });

   const [isEditing, setIsEditing] = useState(false);

   const handleInputChange = (field, value) => {
     setUserInfo((prevInfo) => ({
       ...prevInfo,
       [field]: value,
     }));
   };

   const handleEditClick = () => {
     setIsEditing(true);
   };

   const handleSaveClick = () => {
     setIsEditing(false);
     // Here you would typically update the user information using an API call or a data management library
   };

   const handleDeleteClick = () => {
     // Here you would typically delete the user using an API call or a data management library
   };

   return (
     <div style={styles.container}>
       <h2 style={styles.heading}>User Profile</h2>
       <div style={styles.userInfo}>
         <div>
           <label style={styles.label}>Profile Picture</label>
           <img
             src={userInfo.profilePicture}
             alt="Profile"
             style={styles.profileImage}
           />
         </div>
         <div>
           <label style={styles.label}>User Name</label>
           {isEditing ? (
             <input
               type="text"
               value={userInfo.userName}
               onChange={(e) => handleInputChange("userName", e.target.value)}
             />
           ) : (
             <p style={styles.info}>{userInfo.userName}</p>
           )}
         </div>
         <div>
           <label style={styles.label}>Email</label>
           <p style={styles.info}>{userInfo.email}</p>
         </div>
         <div>
           <label style={styles.label}>Phone Number</label>
           <p style={styles.info}>{userInfo.phoneNumber}</p>
         </div>
         <div>
           <label style={styles.label}>Address</label>
           <p style={styles.info}>{userInfo.address}</p>
         </div>
         <div style={styles.buttonGroup}>
           {isEditing ? (
             <button onClick={handleSaveClick} style={styles.saveButton}>
               Save
             </button>
           ) : (
             <button onClick={handleEditClick} style={styles.editButton}>
               Edit
             </button>
           )}
           <button onClick={handleDeleteClick} style={styles.deleteButton}>
             Delete
           </button>
         </div>
       </div>
     </div>
   );
 };

 const styles = {
   container: {
     maxWidth: "400px",
     margin: "0 auto",
     padding: "20px",
     border: "1px solid #ccc",
     borderRadius: "5px",
     backgroundColor: "#f7f7f7",
   },
   heading: {
     fontSize: "24px",
     marginBottom: "20px",
   },
   userInfo: {
     marginBottom: "15px",
   },
   label: {
     marginBottom: "5px",
     fontWeight: "bold",
   },
   profileImage: {
     maxWidth: "150px",
     borderRadius: "5px",
   },
   info: {
     marginBottom: "10px",
   },
   buttonGroup: {
     marginTop: "20px",
   },
   editButton: {
     marginRight: "10px",
     backgroundColor: "#007bff",
     color: "#fff",
     border: "none",
     borderRadius: "5px",
     padding: "5px 10px",
     cursor: "pointer",
   },
   saveButton: {
     marginRight: "10px",
     backgroundColor: "#28a745",
     color: "#fff",
     border: "none",
     borderRadius: "5px",
     padding: "5px 10px",
     cursor: "pointer",
   },
   deleteButton: {
     backgroundColor: "#dc3545",
     color: "#fff",
     border: "none",
     borderRadius: "5px",
     padding: "5px 10px",
     cursor: "pointer",
   },
 };

 export default UserProfile;
