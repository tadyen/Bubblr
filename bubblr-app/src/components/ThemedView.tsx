import { ReactNode } from "react";
import { View, StyleProp, ViewStyle } from "react-native"
import { useThemeContext } from "../context/theme-context";

export default function ThemedView({style, children}: {style?: any, children: ReactNode}){
  const { theme } = useThemeContext();
  const backgroundColor = theme?.mode === "dark"
    ? theme?.darkColors?.background
    : theme?.lightColors?.background

  return(
    <View style={[style, {backgroundColor: backgroundColor}]}>
      {children}
    </View>
  )
}
