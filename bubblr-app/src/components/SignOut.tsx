import 'react-native-url-polyfill/auto'
import { supabase } from '../lib/supabase';
import { Text, Button } from "@rneui/themed";
import { StyleSheet, View } from 'react-native';
import { useAuthContext } from '../context/auth-context'

export default function SignOut(){
  const session = useAuthContext()?.session;

  return(
    <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <Text style={styles.text}>{session?.user.email}</Text>
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  text: {
    textAlign:'center',
  }
});
