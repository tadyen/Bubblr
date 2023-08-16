import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { createClient } from '@supabase/supabase-js'
import Constants from "expo-constants"

// if using .env file
// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string

export const supabaseConfig = Constants.expoConfig?.extra?.supabase;
const supabaseSchema = supabaseConfig.schema;
const supabaseUrl = supabaseConfig.url;
const supabaseAnonKey = supabaseConfig.publicKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: supabaseSchema
  },
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
    storage: AsyncStorageLib
  }
})
