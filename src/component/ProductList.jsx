import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [productNames, setProductNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/products/names") // API URL to fetch product names only
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product names");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched product names:", data); // Check 'data' structure
        setProductNames(data); // 'data' should be an array of names
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product names:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Product Names List</h2>
      <ul className="list-group">
        {productNames.map((name, index) => (
          <li key={index} className="list-group-item">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
