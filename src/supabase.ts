import { createClient } from '@supabase/supabase-js';

const supabaseURL = 'https://kzgcwqywmnlurjxtgzgf.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
export const supabase = createClient(supabaseURL, supabaseKey);
