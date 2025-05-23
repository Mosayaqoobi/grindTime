//initializez supabase services, and contains methods
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(  //this initializes the project with the url and key
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);
//export so we can use it in other files
export default supabase