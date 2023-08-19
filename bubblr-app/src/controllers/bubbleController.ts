import { supabase } from "../lib/supabase";
import { bubbleImportances } from "../lib/config";

const bubblesTable = "bubbles";

// Ideally get this from the d.ts exports of supabase itself
export type BubbleData = {
  user_id: string
  name: string,
  size: number
  importance: number
}

function validateData(data: BubbleData | undefined){
  // constraint the data
  if( !data ) return undefined
  const { user_id, name, size, importance } = data;
  const { key, minSize, maxSize } = bubbleImportances[importance];
  if(key != importance || ! Number.isInteger(key) ) return undefined
  if(size < minSize || size > maxSize) return undefined
  return data
}

export const bubbleController = {
  GET: async function(user_id: string){
    const {data, error} = await supabase
      .from(bubblesTable)
      .select()
      .eq('user_id', user_id)
    return data
  },
  POST: async function(user_id: string, data: BubbleData){
    const checkedData = validateData(data);
    if( !checkedData ) return false
    if( user_id !== data.user_id ) return false
    const { error } = await supabase
      .from(bubblesTable)
      .insert(data)
    ;
    console.log("POSTED NEW DATA")
    return true
  },
  DELETE: async function(user_id: string, data_id: string){
    const retrieveResponse = await supabase
      .from(bubblesTable)
      .select()
      .eq('id', data_id)
    ;
    const data: BubbleData | null = retrieveResponse.data ? retrieveResponse.data[0] : null;
    if(data?.user_id !== user_id) return false
    const deleteResponse = await supabase
      .from(bubblesTable)
      .delete()
      .eq('id', data_id)
    ;
    return true
  }
}
