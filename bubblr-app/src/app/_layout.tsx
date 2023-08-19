import 'react-native-url-polyfill/auto'
import { AuthContextProvider } from "../context/auth-context"
import { ThemeContextProvider, useThemeContext } from "../context/theme-context";
import { ThemeProvider } from '@rneui/themed';
import ThemedStack from "../components/themed-common/ThemedStack";

export default function Layout(){

  function _Inner(){
    const {theme} = useThemeContext();
    return (
      <ThemeProvider theme={theme}>
        <ThemedStack screenOptions={{headerShown: false}}/>
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
