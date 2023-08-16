// big help from:
// https://github.com/intagaming/expo-todo/blob/f0ec63c75cc1769f63db7f4ee8094d74039b00c6/src/state/auth-context.tsx

import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { AuthSession } from "@supabase/supabase-js";
import { useState, useEffect, createContext, ReactNode } from "react"
import { supabase } from "../lib/supabase";
import { LogBox, Platform } from "react-native";

export type AuthContextType = AuthSession | null | undefined;

export const AuthContext = createContext<AuthContextType>(undefined);

// The default provider style requires value to be specified each use
// as opposed to an on-load
export function AuthContextProvider({ children }: { children: ReactNode }){
  /**
   * Session state types:
   * - undefined: The session is being loaded.
   * - null: The session is fetched and is unavailable.
   * - AuthSession: There is a session.
   */
  const [ session, setSession ] = useState<AuthContextType>(undefined);

  useEffect(()=>{
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

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
}
