import 'react-native-url-polyfill/auto'
import { useState, useEffect, useContext } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, Text, View, Button } from 'react-native'
import { AuthContext } from '../context/auth-context'
import { Sign } from 'crypto'

export default function App() {
  const session = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Root route working!</Text>
      { session &&
        <>
        <Text>Logged in as {session?.user?.email}</Text>
        <SignOut/>
        </>
      }
    </View>
  )
}

function SignOut(){
  return(
    <View style={styles.verticallySpaced}>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
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
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
});
