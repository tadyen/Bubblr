import 'react-native-url-polyfill/auto'
import { Stack } from "expo-router"
import { useThemeContext } from "../../context/theme-context";

type StackProps = Parameters<typeof Stack>[0]

export default function ThemedStack(props: StackProps){
  const { theme } = useThemeContext();

  const colourScheme = theme.mode === "dark"
    ? theme.darkColors
    : theme.lightColors

  const {
    background: backgroundColor,
    black: fontColor,
    greyOutline: headerTintColor,
  } = {...colourScheme};

  const {screenOptions: oldScreenOptions } = props

  const screenOptions: typeof oldScreenOptions = {
    ...oldScreenOptions,
    headerStyle: {
      backgroundColor: backgroundColor,
    },
    headerTitleStyle: {
      color: fontColor,
    },
    headerTintColor: headerTintColor,
  }

  return(
    <Stack
      {...props}
      screenOptions={screenOptions}
    />
  )
}
