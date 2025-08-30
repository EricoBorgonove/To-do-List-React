// ThemeContext.jsx
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeCtx = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("app:theme", "light");

  const toggle = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme deve ser usado dentro do ThemeProvider");
  return ctx;
};
