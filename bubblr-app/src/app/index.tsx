import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { StatusBar } from 'expo-status-bar'
import { supabase } from '../db/supabase'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      <Text>index!</Text>
      <StatusBar style="auto" />
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
