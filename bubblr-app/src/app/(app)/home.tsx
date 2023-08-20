import 'react-native-url-polyfill/auto'
import { StyleSheet, Pressable, View, Dimensions } from 'react-native';
import { Stack } from 'expo-router'
import { Text } from '@rneui/themed';
import { useAuthContext } from '../../context/auth-context'
import { useThemeContext } from '../../context/theme-context'
import BubbleChart from '../../bubbleChart/BubbleChart';
import BubbleAdd from '../../bubbleChart/BubbleAdd';
import ThemedScreen from "../../components/themed-common/ThemedScreen";

export default function Home() {
  const session = useAuthContext()?.session;
  const {themeMode} = useThemeContext();

  return (
    <ThemedScreen style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
        }}
        />
      {/* <BubbleChart /> */}
      {/* <BubbleAdd /> */}
    </ThemedScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});
