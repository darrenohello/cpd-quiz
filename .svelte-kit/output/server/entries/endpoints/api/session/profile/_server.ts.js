import { json } from "@sveltejs/kit";
const POST = async ({ request }) => {
  const body = await request.json();
  const { sessionId, profile } = body;
  if (!sessionId || !profile) {
    return json({ ok: false }, { status: 400 });
  }
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("quiz_sessions").update({ profile }).eq("id", sessionId);
    } catch (err) {
      console.error("Supabase update profile:", err);
    }
  }
  return json({ ok: true });
};
export {
  POST
};
