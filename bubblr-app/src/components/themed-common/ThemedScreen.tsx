import 'react-native-url-polyfill/auto'
import { ViewProps } from "react-native"
import { useThemeContext } from "../../context/theme-context";
import { Screen, ScreenProps } from 'react-native-screens';

export default function ThemedScreen(props: ViewProps){
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
    <Screen {...props} style={style}>
      {props?.children}
    </Screen>
  )
}
