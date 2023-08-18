import { View } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import ThemedDrawer from "../../components/themed-common/ThemedDrawer"
import DarkModeSwitch from "../../components/DarkModeSwitch";
import SignOut from "../../components/SignOut"

export default function Layout(){
  return (
    <ThemedDrawer
      drawerContent={ props => {
        return (
          <>
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            <View style={{margin: 20, alignItems: 'center'}}>
              <SignOut />
              <DarkModeSwitch />
            </View>
          </>
        )
      }}
    />
  )
}
