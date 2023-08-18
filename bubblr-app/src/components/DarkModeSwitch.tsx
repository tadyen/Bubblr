import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Switch } from "@rneui/themed";
import { useThemeContext } from "../context/theme-context";


export default function DarkModeSwitch(props: any){
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
    <View style={styles.container}>
      <View style={styles.switch}>
        {
          isDarkMode
            ? <Icon name='moon' type='ionicon'/>
            : <Icon name='sunny' type='ionicon'/>
        }
        <Switch
          onValueChange={()=>{handleToggle()}}
          value={isDarkMode}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  switch: {
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  }
});
