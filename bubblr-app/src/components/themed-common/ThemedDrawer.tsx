import { Drawer } from "expo-router/drawer"
import { StyleSheet } from 'react-native';
import { useThemeContext } from "../../context/theme-context";
import { DrawerNavigationOptions } from "@react-navigation/drawer";

type DrawerProps = Parameters<typeof Drawer>[0]

export default function ThemedDrawer(props: DrawerProps){
  const { theme } = useThemeContext();

  const colourScheme = theme.mode === "dark"
    ? theme.darkColors
    : theme.lightColors

  const { screenOptions: oldScreenOptions } = props;
  const { drawerStyle: oldDrawerStyle } = { ...oldScreenOptions as DrawerNavigationOptions }

  const drawerStyle = StyleSheet.compose(oldDrawerStyle, {
    backgroundColor: colourScheme?.background,
    color: colourScheme?.black,
    borderColor: colourScheme?.primary,
    borderRightWidth: 1,
  })

  const screenOptions: DrawerNavigationOptions = {
    ...oldScreenOptions,
    headerStyle: {
      backgroundColor: colourScheme?.background,
    },
    headerTitleStyle: {
      color: colourScheme?.black,
    },
    headerTintColor: colourScheme?.black,
    drawerActiveTintColor: colourScheme?.black,
    drawerActiveBackgroundColor: colourScheme?.primary,
    drawerInactiveTintColor: colourScheme?.black,
    drawerInactiveBackgroundColor: colourScheme?.secondary,
    drawerStyle: drawerStyle,
  }

  return(
    <Drawer
      {...props}
      screenOptions={screenOptions}
    />
  )
}
