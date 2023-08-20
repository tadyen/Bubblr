import Constants from "expo-constants"

/* Constants defined in .env can be exposed by prefixing them with "EXPO_PUBLIC"
 * However, these are visible in plain-text in the transpiled files sent to the browser
 *
 * Constants defined using expo-constants can be specified inside app.json
 *
 */

type EnvOption = "DEV" | "PROD";
const envOption = "PROD" as EnvOption;

type SupebaseConfig = {
  url: string,
  key: string,
  schema: string,
}
export const supabaseConfig: SupebaseConfig = (() => {
  if(envOption === "PROD"){
    // specified in .env
    return ({
      url: process.env.EXPO_PUBLIC_SUPABASE_URL,
      key: process.env.EXPO_PUBLIC_SUPABASE_KEY,
      schema: process.env.EXPO_PUBLIC_SUPABASE_SCHEMA,
    })
  }else if(envOption === "DEV"){
    // Specified in app.json
    return Constants.expoConfig?.extra?.supabase;
  }
})();

