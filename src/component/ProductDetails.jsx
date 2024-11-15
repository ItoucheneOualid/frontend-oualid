import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}/details`) // API pour obtenir les détails du produit
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product details:", data);
        setProductDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      {productDetails ? (
        <div>
          <p>
            <strong>Name:</strong> {productDetails.name}
          </p>
          <p>
            <strong>Brand:</strong> {productDetails.brand}
          </p>
          <p>
            <strong>Price:</strong> ${productDetails.price}
          </p>
          <p>
            <strong>Category:</strong> {productDetails.category}
          </p>
          {productDetails.imagePath && (
            <img
              src={`http://localhost:8080/${productDetails.imagePath}`}
              alt={productDetails.name}
              width="100"
              height="100"
            />
          )}
        </div>
      ) : (
        <p>No product details found.</p>
      )}
    </div>
  );
};

export default ProductDetails;
