import 'react-native-url-polyfill/auto'
import { StyleSheet } from 'react-native'
import { Slot } from 'expo-router'
import ThemedView from '../../components/themed-common/ThemedView';

export default function Layout() {
  return (
    <ThemedView style={styles.container}>
      <Slot />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
