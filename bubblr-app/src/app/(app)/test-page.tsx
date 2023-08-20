import 'react-native-url-polyfill/auto'
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@rneui/themed";
import ThemedScreen from "../../components/themed-common/ThemedScreen";
import BubbleAdd from "../../bubbleChart/BubbleAdd";

export default function TestPage(){
  return(
    <ThemedScreen style={styles.container}>
      <Stack.Screen
        options={{
          title: "Test Page",
        }}
      />
      <Text>Test page route working!</Text>
    </ThemedScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bubbleButtons: {
    position: "absolute",
    top: 20,
    left: 20,
  }
})

