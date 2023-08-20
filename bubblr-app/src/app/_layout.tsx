import 'react-native-url-polyfill/auto'
import { useEffect } from 'react';
import { useSegments, useRootNavigationState, useRouter } from 'expo-router';
import { AuthContextProvider, useAuthContext } from "../context/auth-context"
import { ThemeContextProvider } from "../context/theme-context";
import ThemedStack from "../components/themed-common/ThemedStack";
export default function Layout(){
  console.log("ROOT LAYOUT")
  return(
    <>
    <AuthContextProvider>
      <ThemeContextProvider>
        <ThemedStack screenOptions={{headerShown: true}}/>
      </ThemeContextProvider>
      <AuthReroute />
    </AuthContextProvider>
    </>
  )
}

// Protect route access based on user authentication
function AuthReroute(){
  const segments = useSegments();
  const session = useAuthContext()?.session;
  const router = useRouter();
  const rootNavState = useRootNavigationState();

  useEffect(()=>{
    if( !rootNavState ) return;
    console.log("useefect auth reroute");
    // allow only routes in /app/(auth)/*
    const inAuthGroup = segments[0] === '(auth)';
    if( !session && !inAuthGroup ){
      router.replace('/sign-in-up');
    }else if ( session !== null && inAuthGroup ){
      router.replace('/home');
    }
  },[session])

  return(<></>)
}
