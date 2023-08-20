import 'react-native-url-polyfill/auto';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { createClient } from '@supabase/supabase-js'
import { supabaseConfig } from './constants';

export const supabase = createClient(supabaseConfig.url, supabaseConfig.key, {
  db: {
    schema: supabaseConfig.schema,
  },
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
    storage: AsyncStorageLib
  }
})
