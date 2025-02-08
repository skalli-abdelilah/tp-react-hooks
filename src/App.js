import React, { createContext, useState } from "react";
import ProductSearch from "./components/ProductSearch";
import ThemeToggle from "./components/ThemeToggle";

// Create Theme Context
export const ThemeContext = createContext();
// Create Language Context (Optional, for future translations)
export const LanguageContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Added missing state
  const [language, setLanguage] = useState("fr"); // Default language (French)

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div
          className={`container ${
            isDarkTheme ? "bg-dark text-light" : "bg-light"
          }`}
        >
          <header className="my-4">
            <h1 className="text-center">Catalogue de Produits</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="form-select w-auto"
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
          </header>

          <main>
            <ProductSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            {/* <ProductList searchTerm={searchTerm} /> */}
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
