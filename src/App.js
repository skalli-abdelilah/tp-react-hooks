import React, { createContext, useState } from "react";
import ProductSearch from "./components/ProductSearch";
import ThemeToggle from "./components/ThemeToggle";
import { LanguageProvider } from "./components/LanguageContext";
import LanguageSelector from "./components/LanguageSelector";

export const ThemeContext = createContext();
export const LanguageContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en");
  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LanguageProvider value={{ language, setLanguage }}>
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
              <LanguageSelector />
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
      </LanguageProvider>
    </ThemeContext.Provider>
  );
};

export default App;
