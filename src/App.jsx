import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateCategory from "./component/CreateCategory"; // Make sure the path is correct
import CategoryList from "./component/CategoryList"; // Make sure the path is correct
import ProductList from "./component/ProductList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            MyApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/create-category">
                  Créer une Catégorie
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  Liste des Catégories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Liste des Produits
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
