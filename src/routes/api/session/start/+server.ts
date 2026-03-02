import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
  const sessionId = crypto.randomUUID();
  const seed = crypto.randomUUID();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from('quiz_sessions').insert({
        id: sessionId,
        seed,
        core_count: 15,
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Supabase insert session:', err);
    }
  }

  return json({ sessionId, seed });
};
