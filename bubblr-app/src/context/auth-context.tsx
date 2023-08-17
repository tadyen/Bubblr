import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { AuthSession } from "@supabase/supabase-js";
import { useState, useEffect, createContext, useMemo, ReactNode, useContext } from "react"
import { supabase } from "../lib/supabase";
import { LogBox, Platform } from "react-native";
import { router, useSegments } from 'expo-router';

export type Session = AuthSession | null | undefined;
type AuthContextType = { session: Session }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The default provider style requires value to be specified each use as opposed to an on-load
// A custom provider here fixes that
export function AuthContextProvider({ children }: { children: ReactNode }){
  /**
   * Session state types:
   * - undefined: The session is being loaded.
   * - null: The session is fetched and is unavailable.
   * - AuthSession: There is a session.
   */
  const [ session, setSession ] = useState<Session>(undefined);

  // hook to retrieve session
  useEffect(()=>{
    console.log("useefect auth");
    (async ()=>{
      const {data, error} = await supabase.auth.getSession()
      const fetchedSession = data.session
      // Web allows session to be immediately retrieved.
      if(Platform.OS === "web"){
        setSession(fetchedSession);
        return;
      }
      // Native requires AsyncStorageLib instead
      const storageSession = await AsyncStorageLib.getItem("supabase.auth.token");
      // set to null if no auth retrieved
      if(!storageSession){
        setSession((prev)=>
          (prev === undefined) ? null : prev
        )
      }
    })()
    // update session with listener
    const {data: authListener} = supabase.auth.onAuthStateChange(
      async (_event, newSession)=>{
        setSession(newSession);
      }
    );
    // disconnect listener
    return ()=>{
      authListener?.subscription.unsubscribe();
    };
  },[]);

  // hook to protect route access based on user authentication
  const segments = useSegments();
  useEffect(()=>{
    console.log("useefect auth segments");
    // allow only routes in /app/(auth)/*
    const inAuthGroup = segments[0] === '(auth)';
    if( !session && !inAuthGroup ){
      router.replace('/sign-in-up');
    }else if ( session !== null && inAuthGroup ){
      router.replace('/');
    }
  },[session, segments])

  const value = useMemo(()=>{
    console.log("usememo auth");
    return {session}
  },[session]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(){
  const context = useContext(AuthContext);
  if(context === undefined){
    throw new Error("useAuthContext must be used within AuthContextProvider.")
  }
  return context
}
