
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://jzzsatstakyuhldefpst.supabase.co';  // Replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6enNhdHN0YWt5dWhsZGVmcHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NDAxODEsImV4cCI6MjA0ODMxNjE4MX0._9BP5GkRdO5kOIGq84Msq2xaO2XvUpcwwQ6-qGSLr1s'; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
