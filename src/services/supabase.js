import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zkottpucilhaqgkhqjpw.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprb3R0cHVjaWxoYXFna2hxanB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMjg0NjQsImV4cCI6MjA2MzYwNDQ2NH0.nCox_JvfCSuccq45DqNqHQMnz6xifDi-By44tvztNHk"; // Should start with 'eyJ...'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;