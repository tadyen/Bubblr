// import 'react-native-url-polyfill/auto'
import { StyleSheet, Pressable, View, Dimensions } from 'react-native';
import { Stack } from 'expo-router'
import { Text } from '@rneui/themed';
import { useAuthContext } from '../../context/auth-context'
import { useThemeContext } from '../../context/theme-context'
import ThemedView from '../../components/themed-common/ThemedView';
import BubbleChart from '../../components/BubbleChart';

export default function App() {
  const session = useAuthContext()?.session;
  const {themeMode} = useThemeContext();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <BubbleChart />
    </ThemedView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});
