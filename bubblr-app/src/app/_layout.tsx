import { Stack } from "expo-router";
import { AuthContextProvider } from '../context/auth-context'

export default function Layout(){
  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </AuthContextProvider>
  )
}
