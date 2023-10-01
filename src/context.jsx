import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

//! func. to check whether user prefers dark mode via JS
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "prefers-color-scheme:dark"
  ).matches;

  const storedDarkMode = localStorage.getItem("darkTheme") === "true";

  return storedDarkMode || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("forest mountains");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);

    //! func. to check whether user prefers dark mode via localStorage of browser
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  useEffect(() => {
    //! process to toggle dark theme
    document.body.classList.toggle("dark-theme", isDarkTheme); //select body element then insert new class
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
