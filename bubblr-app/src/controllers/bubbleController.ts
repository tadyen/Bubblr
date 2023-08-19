import { supabase } from "../lib/supabase";
import { ApiMethod } from "./controllersConfig";
import { bubbleImportances } from "../lib/config";

// Ideally get this from the d.ts exports of supabase itself
export type BubbleData = {
  user_id: string
  name: string,
  size: number
  importance: number
}

function dataTypeGuard(data: BubbleData | undefined){
  // constraint the data
  if( !data ) return undefined
  const { user_id, name, size, importance } = data;
  const { key, minSize, maxSize } = bubbleImportances[importance];
  if(key != importance || ! Number.isInteger(key) ) return undefined
  if(size < minSize || size > maxSize) return undefined
  return data
}

export async function bubbleController(method: ApiMethod, data: BubbleData | undefined){
  switch(method){
    case "GET":

      break
    case "POST":
      const checkedData = dataTypeGuard(data);
      if( !checkedData ) return false
      const { error } = await supabase.from("bubbles").insert(data);
      console.log("POSTED NEW DATA")
      break
    default:
      return false
  }
  return true

}
