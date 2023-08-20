import 'react-native-url-polyfill/auto'
import { StyleSheet } from 'react-native'
import ThemedScreen from '../../components/themed-common/ThemedScreen'
import { Slot, Stack } from 'expo-router'
import { AuthContextProvider } from "../../context/auth-context"
import { ThemeContextProvider } from "../../context/theme-context";
import ThemedStack from '../../components/themed-common/ThemedStack'

export default function Layout() {
  console.log("Auth Layout")
  return (
      <ThemedScreen style={styles.container}>
        <Stack.Screen
          options={{
            title: "(auth) Stack",
          }}
        />
        <Slot />
      </ThemedScreen>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
