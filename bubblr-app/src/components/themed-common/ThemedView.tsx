import { View, ViewProps } from "react-native"
import { useThemeContext } from "../../context/theme-context";

export default function ThemedView(props: ViewProps){
  const { theme } = useThemeContext();

  const colourScheme = theme.mode === "dark"
    ? theme.darkColors
    : theme.lightColors

  const {
    background: backgroundColor,
  } = {...colourScheme};

  const { style: oldStyle } = props

  const style: typeof oldStyle = [oldStyle, {
    backgroundColor: backgroundColor
  }]
  return(
    <View {...props} style={style}>
      {props?.children}
    </View>
  )
}
