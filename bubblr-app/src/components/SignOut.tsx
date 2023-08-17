import 'react-native-url-polyfill/auto'
import { supabase } from '../lib/supabase'
import { StyleSheet, Text, View, Button } from 'react-native'

export default function SignOut(){
  return(
    <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
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
});
