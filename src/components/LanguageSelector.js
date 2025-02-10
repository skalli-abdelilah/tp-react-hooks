import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { ThemeContext } from "../App";

const LanguageSelector = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);
  

  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <select className= {`${isDarkTheme ? "bg-dark text-light" : ""} px-5 py-2 rounded`} id="language-selector" value={language} onChange={handleChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
      </select>
    </div>
  );
};

export default LanguageSelector;