import 'react-native-url-polyfill/auto'
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Text } from "@rneui/themed";
import ThemedView from "../../components/themed-common/ThemedView";
import BubbleButtons from "../../components/BubbleOptions";
import BubbleAdd from "../../bubbleChart/BubbleAdd";

export default function TestPage(){
  return(
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Test Page",
        }}
      />
      <Text>Test page route working!</Text>
      <BubbleAdd />
      <View style={styles.bubbleButtons}>
      </View>
    </ThemedView>
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

