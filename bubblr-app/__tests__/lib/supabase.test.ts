import { supabase } from "../../src/lib/supabase"

describe("Testing supabase lib helper ", ()=>{
  test('Has connection object', ()=>{
    expect(supabase).toBeDefined()
  });
  test('Has response', async ()=>{
    const {data, error} = await supabase.rpc('hello world');
    expect(data).toBe('Hello world')
    expect(error).toBe(null)
  })
});
