 import React from "react";
 import { Container, Row, Col, Card } from "react-bootstrap";
 import { useParams } from "react-router-dom";
 import products from "../data/products";

 const ProductDetail = () => {
   // Get the product ID from URL parameter
   const { productId } = useParams();

   // Find the product based on the ID
   const product = products.find(
     (product) => product.id === parseInt(productId)
   );

   // Check if the product exists
   if (!product) {
     return <p>Product not found</p>;
   }

   return (
     <Container>
       <h2 className="my-4">Product Detail</h2>
       <Row>
         <Col md={6}>
           <Card>
             <Card.Img variant="top" src={product.image} alt={product.name} />
           </Card>
         </Col>
         <Col md={6}>
           <h3>{product.name}</h3>
           <p>Price: {product.price}</p>
           <p>Rating: {product.rating}</p>
           {/* Add more product details as needed */}
         </Col>
       </Row>
     </Container>
   );
 };

 export default ProductDetail;
