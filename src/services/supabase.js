import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qvmoxlwwfqstkhdzurfb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2bW94bHd3ZnFzdGtoZHp1cmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MDYwMjksImV4cCI6MjA0NTI4MjAyOX0.9o4Q6MS0_eLBtQOXShwtAq6fRSMm8T5vflff-4zGfwc";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
