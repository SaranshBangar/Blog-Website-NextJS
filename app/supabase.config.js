import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    'https://pslzxeoqhmbszsgnxpqe.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzbHp4ZW9xaG1ic3pzZ254cHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwNzQwNzEsImV4cCI6MjAyMDY1MDA3MX0.FBAPsDcTgOM3fVNbRoA_oNXdTNCg1z95tCfBpCOkC7E',
)