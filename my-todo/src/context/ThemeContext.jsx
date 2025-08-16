import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeCtx = createContext(null);

const ThemeProvider = ({children}) =>{
    const [theme, setTheme] = useLocalStorage ("app:theme", "light")

    // faz a mudança do tema
    const toggle = useCallback (()=> {
        setTheme((t)=> (t === "light"? "dark": "light"));
    },[setTheme]);

    //aplica o tema como atributo no html
    useEffect (()=> {
        document.documentElement.setAttribute("data-theme", theme)
    },[theme])

    const value = useMemo (()=> ({theme, toggle}), [theme, toggle])
    return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}
const useTheme = () => {
    const ctx = useContext(ThemeCtx);
    if(!ctx) throw new Error ("useTheme deve ser usado dentro do ThemeProvider")
        return ctx;
}
export default {ThemeProvider, useTheme};