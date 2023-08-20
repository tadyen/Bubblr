import Constants from "expo-constants"
import { Platform } from "react-native";
/* Constants defined in .env are exposed by prefixing them with "EXPO_PUBLIC"
 * However, these are visible in plain-text in the transpiled js sent to the browser
 *
 * Constants defined using expo-constants can be specified inside app.json
 *
 */

console.log(`Hello on: ${Platform.OS}`);

type SupebaseConfig = {
  url: string,
  key: string,
  schema: string,
}
export const supabaseConfig: SupebaseConfig = (() => {
  if(process.env.NODE_ENV === "development"){
    console.log("Env: Development");
    // Specified in app.json
    return Constants.expoConfig?.extra?.supabase;
  }else{
    console.log("Env: Production");
    // specified in .env
    return ({
      url: process.env.EXPO_PUBLIC_SUPABASE_URL,
      key: process.env.EXPO_PUBLIC_SUPABASE_KEY,
      schema: process.env.EXPO_PUBLIC_SUPABASE_SCHEMA,
    })
  }
})();
