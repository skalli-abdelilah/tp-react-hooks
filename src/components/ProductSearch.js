import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import useDebounce from "../hooks/useDebounce";
import ProductList from "./ProductList";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isDarkTheme } = useContext(ThemeContext);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.daaif.net/products");
        if (!response.ok) throw new Error("Erreur réseau");
        console.log(response);
        const data = await response.json();
        const filteredProducts = data.products.filter((product) =>
          product.title
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        );
        console.log(filteredProducts);
        console.log(debouncedSearchTerm);

        setProducts(filteredProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm]);

  return (
    <div className="my-4">
      <div className="input-group mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un produit..."
          className={`form-control ${isDarkTheme ? "bg-dark text-light" : ""}`}
        />
        <button className={`${isDarkTheme ? "bg-dark text-light" : ""} input-group-text`} onClick={() => { setSearchTerm("") }}>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
      {/* {loading && <p>Chargement des produits...</p>}
      {error && <p className="text-danger">{error}</p>} */}
      {<ProductList searchTerm={debouncedSearchTerm} />}
    </div>
  );
};

export default ProductSearch;
