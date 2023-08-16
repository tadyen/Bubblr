import 'react-native-url-polyfill/auto'
import { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { AuthContextProvider, AuthContext, AuthContextType } from '../state/auth-context'

export default function App() {
  return (
    <AuthContextProvider>
      <View>
        <Text>Root route working!</Text>
      </View>
    </AuthContextProvider>
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
