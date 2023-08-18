import { useState } from "react";
import { View, StyleSheet, Modal, Button } from "react-native";
import { Icon } from "@rneui/themed";
import { useThemeContext } from "../context/theme-context";



export default function BubbleOptions(){
  const { theme, themeMode } = useThemeContext();
  const [visible, setVisible] = useState(false);

  return(
    <View style={styles.container}>
      <Button
        title="Add"
      />
      <Button
        title="Del"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 5,
  }
})
