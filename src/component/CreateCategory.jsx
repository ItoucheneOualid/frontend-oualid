import React, { useState } from "react";
import "../styles/CreateCategory.css";

function CreateCategory() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Catégorie "${data.name}" créée avec succès!`);
        setName("");
      } else {
        setMessage(
          "Erreur lors de la création de la catégorie. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie :", error);
      setMessage(
        "Erreur lors de la création de la catégorie. Veuillez réessayer."
      );
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Créer une nouvelle catégorie</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Nom de la catégorie:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </label>
        <button type="submit" className="button">
          Créer
        </button>
      </form>
      {message && (
        <p className={`message ${message.includes("Erreur") ? "error" : ""}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default CreateCategory;
