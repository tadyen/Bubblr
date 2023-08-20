import 'react-native-url-polyfill/auto'
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import ThemedDrawer from "../../components/themed-common/ThemedDrawer"
import DarkModeSwitch from "../../components/DarkModeSwitch";
import SignOut from "../../components/SignOut"
import { Slot, Stack } from 'expo-router';
import ThemedScreen from '../../components/themed-common/ThemedScreen';
import { AuthContextProvider } from "../../context/auth-context"
import { ThemeContextProvider } from "../../context/theme-context";

export default function Layout(){
  console.log("App Layout")
  return (
    <>
      <Stack.Screen
        options={{
          title: "(app) Stack",
        }}
        />
      <ThemedDrawer drawerContent={ (props)=> <DrawerContent {...props}/> }/>
    </>
  )
}

function DrawerContent(props: any){
  return (
    <ThemedScreen style={styles.container}>
      <View style={styles.drawerContent}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props}/>
        </DrawerContentScrollView>
      </View>
      <View style={styles.otherContent}>
        <SignOut />
        <DarkModeSwitch />
      </View>
    </ThemedScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContent: {
    flex: 1,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    padding: 5,
  },
  otherContent: {
    margin: 20,
    alignItems: 'center',
  }
});
