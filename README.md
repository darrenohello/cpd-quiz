# Ausmed CPD Quiz

Mobile-first, accessible formative CPD knowledge check for nurses and midwives (AHPRA/NMBA). Built with SvelteKit and TypeScript.

## Flow

1. **Intro** — Campaign landing; Start begins a session.
2. **Profile** — 2–3 setup questions (profession, registration type, optional info card).
3. **Quiz** — Core graded questions (shuffled) + survey/reflection questions. Immediate feedback after each submit.
4. **Results** — Score, topic breakdown, tailored CTA, checklist PDF link, share, retake.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Environment variables

Copy `.env.example` to `.env` and set:

- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_ANON_KEY` — anon key (or use service role for server-only writes)
- `SUPABASE_SERVICE_ROLE_KEY` — (optional) for server-side API routes; keeps RLS strict

If these are not set, the app still runs; session/answer/complete API routes no-op (no DB writes).

## Supabase schema (minimal)

Run in SQL editor:

```sql
create table if not exists quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  profile jsonb,
  seed text,
  core_count int,
  completed_at timestamptz,
  last_seen_at timestamptz,
  overall_score float,
  topic_scores jsonb
);

create table if not exists quiz_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references quiz_sessions(id),
  question_id text,
  question_type text,
  topic text,
  selected_option_id text,
  is_correct boolean,
  text_answer text,
  time_ms int
);
```

## Project structure

- `src/lib/questions.ts` — Question bank (from `updated-questions.ts`)
- `src/lib/config/rules.ts` — CPD rules (lastReviewed, sources, computeRequiredHours)
- `src/lib/quiz-select.ts` — Profile/quiz question selection, seeded shuffle
- `src/lib/quiz-state.ts` — Client quiz state (step, profile, answers, score)
- `src/lib/score.ts` — Scoring and CTA thresholds
- `src/lib/components/` — Button, Card, Progress, RadioGroup, FeedbackPanel
- `src/lib/views/` — Intro, ProfileSetup, Quiz, Results
- `src/routes/api/session/` — start, profile, answer, complete

## Build

```bash
npm run build
npm run preview
```
