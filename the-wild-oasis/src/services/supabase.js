
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://wcedrsnpfqbrpycdxzjy.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZWRyc25wZnFicnB5Y2R4emp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3OTU1OTYsImV4cCI6MjA3OTM3MTU5Nn0.yCnnmrBJwoIZOuuiOXR0qHDe-b9teJlyUOd1U3ZCRYQ"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;