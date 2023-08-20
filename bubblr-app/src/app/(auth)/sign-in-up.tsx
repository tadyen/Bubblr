import 'react-native-url-polyfill/auto'
import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input, Text, Icon } from '@rneui/themed'
import { supabase } from '../../lib/supabase'
import { Stack } from "expo-router";
import ThemedScreen from '../../components/themed-common/ThemedScreen'

export default function SignInUp(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error){
      Alert.alert(error.message);
      isErrorTimeout();
    }
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if(error){
      Alert.alert(error.message);
      isErrorTimeout();
    }
    setLoading(false)
  }

  async function isErrorTimeout(){
    if(!isError){
      setIsError(true);
      setTimeout(()=>{
        setIsError(false);
      }, 2000);
    }
  }

  return (
    <ThemedScreen style={styles.container}>
      <Stack.Screen
        options={{
          title: "Login",
        }}
      />
      <Text>Please Login or Sign-Up to continue</Text>
      <Text style={styles.errorMsg}>{ isError && "Invalid input combination"}</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={<Icon type='font-awesome' name='envelope'/>}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label={"Password"}
          leftIcon={<Icon type='font-awesome' name='lock' />}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Login" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
    </ThemedScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  errorMsg: {
    color: 'red',
  }
})
