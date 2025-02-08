import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import useDebounce from "../hooks/useDebounce";
import ProductList from "./ProductList";

const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const [products, setProducts] = useState([]); // ✅ Products state
  const [loading, setLoading] = useState(false); // ✅ Ensure setLoading is correctly defined
  const [error, setError] = useState(null); // ✅ Handle errors properly

  const { isDarkTheme } = useContext(ThemeContext);
  const debouncedSearchTerm = useDebounce(searchTerm, 2500);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true); //
      try {
        const response = await fetch("https://api.daaif.net/products");
        if (!response.ok) throw new Error("Erreur réseau");

        const data = await response.json();
        const filteredProducts = data.products.filter((product) =>
          product.title
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        );

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
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un produit..."
        className={`form-control ${isDarkTheme ? "bg-dark text-light" : ""}`}
      />

      {loading && <p>Chargement des produits...</p>}
      {error && <p className="text-danger">{error}</p>}
      {<ProductList products={products} searchTerm={searchTerm} />}
    </div>
  );
};

export default ProductSearch;
