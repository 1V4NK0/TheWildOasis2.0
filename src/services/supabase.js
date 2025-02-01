import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kwchrcjifrvqpdxiktpw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3Y2hyY2ppZnJ2cXBkeGlrdHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0MTEyODMsImV4cCI6MjA1Mzk4NzI4M30.o-zDf-jmWLt7EvahEdsU0OzjywLtOqagDON3qDJygag";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
