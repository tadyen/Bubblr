import { useState, useEffect, useCallback } from "react";
import { Switch } from "react-native";
import { useThemeContext } from "../context/theme-context";

export default function DarkModeSwitch(){
  const themeProvider = useThemeContext();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(()=>{
    console.log("useEffect darkmodeswitch");
    setIsDarkMode( themeProvider.themeMode === "dark");
  },[themeProvider])

  const handleToggle = useCallback( ()=>{
    themeProvider.toggleTheme();
  },[themeProvider]);

  return(
    <Switch
      onValueChange={()=>{handleToggle()}}
      value={isDarkMode}
    />
  )
}


