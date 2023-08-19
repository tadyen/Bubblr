import { supabase, supabaseConfig } from "../../src/lib/supabase"
console.log(supabaseConfig)
describe("Testing supabase lib helper ", ()=>{
  test('Smoke: Has config',()=>{
    expect(supabaseConfig).toBeDefined();
    expect(supabaseConfig).toHaveProperty('url');
    expect(supabaseConfig).toHaveProperty('schema');
    expect(supabaseConfig).toHaveProperty('publicKey');
  });
  test('Has connection object', ()=>{
    expect(supabase).toBeDefined()
  });
  test('Has response', async ()=>{
    const {data, error} = await supabase.rpc('hello world');
    expect(data).toBe('Hello world')
    expect(error).toBe(null)
  })
});
