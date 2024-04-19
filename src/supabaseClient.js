import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://fxqwmccosfttyweineut.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cXdtY2Nvc2Z0dHl3ZWluZXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzMzE1NzcsImV4cCI6MjAyODkwNzU3N30.nv8Oru0BSE0ED8kONnQZTA-s3SuJzDBqcsva_5OKbSY';
export const supabase = createClient(supabaseUrl, supabaseKey);
