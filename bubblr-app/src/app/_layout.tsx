import { Stack } from "expo-router";
import { AuthContextProvider } from '../context/auth-context';
import { ThemeContextProvider, useThemeContext } from "../context/theme-context";
import { ThemeProvider } from '@rneui/themed';

export default function Layout(){

  function _Inner(){
    const {theme} = useThemeContext();
    return (
      <ThemeProvider theme={theme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#111111',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </ThemeProvider>
    )
  }

  return(
    <AuthContextProvider>
      <ThemeContextProvider>
        <_Inner/>
      </ThemeContextProvider>
    </AuthContextProvider>
  )
}
