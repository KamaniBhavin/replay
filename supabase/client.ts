import { createClient } from '@supabase/supabase-js';
import { Database } from './database';

// TODO: Move this to environment variables.
const supabase = createClient<Database>(
  'https://ndsjcwugujvrwkxhlzpe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kc2pjd3VndWp2cndreGhsenBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1Mzg3NjMsImV4cCI6MTk5NzExNDc2M30.gZfDwn51CxqtW7qfuKiakjDnpuBXaC-AP8QohdJb-3Q',
);

export default supabase;
