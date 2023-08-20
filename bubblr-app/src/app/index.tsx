import { Redirect } from "expo-router"

export default function Root(){
  console.log("index.tsx in root")
  return(
    <Redirect href="/home" />
  )
}
