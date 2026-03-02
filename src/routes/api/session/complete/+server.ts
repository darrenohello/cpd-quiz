import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { sessionId, overallScore, topicScores } = body as {
    sessionId: string;
    overallScore: number;
    topicScores: Record<string, { correct: number; total: number }>;
  };

  if (!sessionId) {
    return json({ ok: false }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase
        .from('quiz_sessions')
        .update({
          completed_at: new Date().toISOString(),
          last_seen_at: new Date().toISOString(),
          overall_score: overallScore,
          topic_scores: topicScores ?? {},
        })
        .eq('id', sessionId);
    } catch (err) {
      console.error('Supabase complete session:', err);
    }
  }

  return json({ ok: true });
};
