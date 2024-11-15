import React, { useEffect, useState } from "react";
import "../styles/CategoryList.css";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/categories/dtos"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette catégorie ?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la catégorie");
      }

      // Mise à jour de la liste des catégories après suppression
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression de la catégorie");
    }
  };

  return (
    <div className="category-list-container">
      <h2 className="category-title">Liste des Catégories</h2>
      {loading ? (
        <p className="loading-message">Chargement...</p>
      ) : (
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id} className="category-item">
              {category.name}
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="delete-button"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryList;
