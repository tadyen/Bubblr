import { useState, createContext, ReactNode, useContext, useCallback, useEffect, useMemo } from "react";
import { createTheme, useTheme, useThemeMode, ThemeProvider, lightColors, darkColors } from "@rneui/themed";
import { Platform } from "react-native";

type ThemeModes = "light" | "dark";
type Theme = ReturnType <typeof createTheme>;
type ThemeContextType = {
  themeMode: ThemeModes,
  toggleTheme: Function,
  theme: Theme
}

const defaultTheme = createTheme({
  mode: "dark"
})

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({children}:{children: ReactNode}){
  const [themeMode, setThemeMode] = useState<ThemeModes>("dark");
  const [theme, _] = useState<Theme>(defaultTheme);

  const toggleTheme = useCallback( ()=>{
    const newMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newMode);
    theme.mode = newMode;
    console.log("toggle theme to " + newMode);
  },[themeMode])

  const value = useMemo(()=>{
    return({
      themeMode,
      toggleTheme,
      theme
    })
  },[themeMode]);

  return(
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext(){
  const context = useContext(ThemeContext);
  if(context === undefined){
    throw new Error("useThemeContext must be used within ThemeContextProvider.")
  }
  return context
}
