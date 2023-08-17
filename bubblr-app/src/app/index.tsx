import 'react-native-url-polyfill/auto'
import { useState, useEffect, useContext } from 'react'
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router'
import { Text } from '@rneui/themed';
import { useAuthContext } from '../context/auth-context'
import { useThemeContext } from '../context/theme-context'
import { supabase } from '../lib/supabase'
import SignOut from "../components/SignOut";
import DarkModeSwitch from '../components/DarkModeSwitch'
import ThemedView from '../components/ThemedView';

export default function App() {
  const session = useAuthContext()?.session;
  const {themeMode} = useThemeContext();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
        }}
        />
      <Text>Root route working!</Text>
      { session &&
        <>
        <Text>Logged in as {session?.user?.email}</Text>
        <SignOut/>
        <DarkModeSwitch/>
        </>
      }
      <Text>Dark enabled: { themeMode === "dark" ? 'true' : 'false'}</Text>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
