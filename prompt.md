## V1 Product Spec — Ausmed CPD Quiz (Formative)

### 1) Purpose

A mobile-first, accessible, playful CPD knowledge check that:

- teaches users as they go (immediate feedback + explanation),
- adapts questions to the user’s profile (profession / grad status / endorsements),
- produces an end summary (score + topic breakdown + tailored CTA),
- captures anonymous analytics + performance for yearly comparison.

### 2) Success criteria (measurable)

- Completion rate (start → finish)
- Median time-to-complete
- Drop-off per question ID
- Average overall score + topic scores
- Distribution of key misconception questions (e.g. minimum hours, documentation duration)
- CTR to **Ausmed free CPD course** on results screen
- PDF checklist download clicks + share clicks

### 3) Non-goals (explicitly out of scope)

- Accounts/login, saving progress across devices
- Adaptive difficulty
- Admin authoring UI
- Generating PDFs of results
- Storing personally identifying info (unless you later choose to)

---

## 4) Information architecture / screens

### Screen A — Landing / Intro

**Content**

- Title (campaign vibe)
- 1–2 lines: “Quick CPD check before the deadline”
- Primary CTA: “Start”
- Secondary: “What this is” accordion (formative, not official advice)
- Small print: “Always confirm with AHPRA. Last reviewed: {rules.lastReviewed}” + link(s)

**Events**

- `quiz_viewed`
- `quiz_started` (on Start click)

---

### Screen B — Profile Setup (3–5 questions)

**Goal**: Build a `profile` object used for question selection and variable piping.

**Question types**: radio / select (no grading)

Example profile fields (you’ll finalise):

- Primary profession (RN / Midwife / EN / Student / Other…)
- Graduate status (e.g., in first year? Y/N) OR “time since initial registration”
- Career length bucket (optional if useful for branching)
- Endorsements count (0 / 1 / 2 / 3+), if relevant

**UX rules**

- One question per screen (best on mobile), or 2 per screen max.
- Back allowed (since it’s setup).
- Progress indicator: “Setup 1/4”, “Setup 2/4”.

**Events**

- `profile_completed` (store profile payload)

---

### Screen C — Quiz (Core)

**Format**

- 12–18 questions **core**
- Optional “Bonus questions” after core results or after core completion (you decide; see below)

**Question types v1**

- Graded: single-correct MCQ, True/False
- Ungraded: text reflection (optional; includes example answer shown after submit)

**Per-question UI**

- Prompt + (optional) short helper note
- Answers (radio list)
- Submit button (disabled until selection for graded; for text allow blank but nudge)
- After submit → show:
  - Correct/Incorrect state
  - Correct answer
  - Explanation (short, scannable)
  - “Learn more” (optional per question)
  - Continue button

**Navigation**

- Back: allowed to view explanation, but do **not** change submitted answers (recommended).
  - If user goes back, they can review, but once submitted it’s locked.
  - Reason: avoids messy state and keeps analytics clean.

**Progress**

- “Question 5 of 15”
- Optional topic chip (e.g., Requirements / Documentation / Learning goals)

**Events**

- `question_viewed`
- `question_answered` (includes correctness and time-on-question)
- `quiz_dropoff` (if session ends mid-quiz — tracked server-side via “last event timestamp”, see analytics section)

---

### Screen D — Results / Success

**Content blocks**

1. **Completion celebration**
   - playful but respectful
   - “You’re ready for CPD season” vibe

2. **Score summary**
   - Overall: “X/Y correct”
   - Topic breakdown: stacked list
     - e.g., Requirements: 4/6, Documentation: 2/4, Learning goals: 3/5

   - “Most missed topics” callout

3. **Tailored CTA to free CPD course**
   - If score < threshold (e.g. <70%): “Want a quick refresher? Take our free CPD requirements course.”
   - If score high: “You’re on top of it — share this with a colleague or skim our free course for edge cases.”
   - This is copy logic only; no extra branching needed.

4. **Checklist download**
   - Simple link/button to PDF

5. **Share**
   - Share link to the quiz (no performance sharing)
   - Use Web Share API on mobile; fallback to copy link

6. **Compliance disclaimer**
   - “Always confirm with AHPRA. Last reviewed: {date}.” + link(s)

**Events**

- `quiz_completed`
- `cta_course_clicked`
- `checklist_download_clicked`
- `share_clicked`
- `retake_clicked`

---

## 5) Quiz logic and question selection

### A) Pool model

You’ll store all questions in a single file/module (v1 hard-coded is fine but structured):

- `questions/core/*.ts` or `questions.ts`
- Each question has:
  - `id`
  - `type` (`mcq` | `tf` | `text`)
  - `topic` (single topic string or array)
  - `prompt`
  - `options` (for mcq/tf)
  - `correctOptionId` (for graded only)
  - `explanation`
  - `exampleAnswer` (for text)
  - `visibility(profile)` function OR a declarative rule
  - `pipe(profile)` optional variables in prompt/explanation

### B) Selection algorithm (v1)

- Build candidate list = all questions where `visibility(profile)` is true
- Choose:
  - up to `CORE_COUNT` (e.g. 15) from candidates
  - ensure topic coverage (simple balancing):
    - minimum 2 from each required topic if possible

- Bonus:
  - remaining questions or a curated bonus set

### C) Randomisation (nice-to-have, but easy if you do it now)

Implement _seeded_ shuffle per session:

- `seed = crypto.randomUUID()` generated at session start
- shuffle question order + (optionally) mcq options order using seed
- Store seed in analytics so results are reproducible later (handy)

If you don’t do options shuffle in v1, at least do question shuffle.

---

## 6) Scoring and thresholds

### A) What counts

- Only graded questions (mcq/tf) contribute.
- Text reflection: stored (optional), not scored.

### B) Output

- `overallScore = correct / gradableCount`
- `topicScores[topic] = correct / totalInTopic`

### C) CTA thresholds (copy-only)

- Poor: < 0.70
- Good: 0.70–0.89
- Excellent: ≥ 0.90

---

## 7) Rules config (single source of truth)

Create `src/lib/config/rules.ts`:

- `lastReviewed: "YYYY-MM-DD"`
- `sources: [{ label, url }]` (AHPRA links)
- CPD requirements variables (you’ll confirm):
  - `requiredHoursByProfession`
  - `endorsementHourAdditions`
  - `gradQuarterRules` etc.

- Helper methods:
  - `computeRequiredHours(profile): number`
  - `computeRequirementLabel(profile): string`

Show `lastReviewed` to users on intro + results.

---

## 8) Analytics + performance storage (important)

You said: _store performance per user for quant analysis._
That means you need a database.

### Recommendation: Supabase (fastest path)

- Anonymous session ID (UUID) per attempt
- Store events and final results
- No email, no name

#### Tables (minimal)

1. `quiz_sessions`

- `id` (uuid, pk)
- `created_at`
- `profile` (jsonb)
- `seed` (text)
- `core_count` (int)
- `completed_at` (timestamp, nullable)
- `user_agent` (text, optional)
- `referrer` (text, optional)

2. `quiz_answers`

- `id` (uuid pk)
- `session_id` (uuid fk)
- `question_id` (text)
- `question_type` (text)
- `topic` (text)
- `selected_option_id` (text, nullable)
- `is_correct` (bool, nullable for text)
- `text_answer` (text, nullable)
- `time_ms` (int)

3. (Optional but useful) `quiz_events`

- event stream for richer analytics
- otherwise you can infer a lot from sessions+answers

#### What to store (v1 minimum)

- profile payload
- for each graded question: selected option + correct
- time per question
- completion timestamp
- total score + topic scores (can be computed server-side at end, but storing helps)

#### Drop-off tracking

Simplest:

- update `quiz_sessions.last_seen_at` on each answer submit
- if `completed_at` is null and `last_seen_at` older than X, count as dropoff (in analysis)

---

## 9) Accessibility requirements (v1)

- Fully keyboard navigable
- Visible focus states
- Radios grouped with proper labels (`fieldset`/`legend`)
- ARIA live region for feedback (“Correct/Incorrect”)
- Contrast AA
- Large tap targets (44px+)
- Motion: respect `prefers-reduced-motion`

---

## 10) Tech spec (SvelteKit)

### Stack

- SvelteKit
- TypeScript
- Supabase JS client
- Adapter: depends on hosting
  - Vercel/Netlify easy
  - Cloudflare Pages is possible, but Supabase + CF is still fine

### State model (client)

- `sessionId`
- `seed`
- `profile`
- `questionList[]` (selected core + bonus)
- `currentIndex`
- `answersByQuestionId`
- `score` derived

### API routes (SvelteKit `src/routes/api/...`)

- `POST /api/session/start`
  - creates session row, returns `sessionId` + `seed`

- `POST /api/session/profile`
  - saves profile

- `POST /api/session/answer`
  - writes answer row (and updates `last_seen_at`)

- `POST /api/session/complete`
  - marks completed + stores computed scores

(You _can_ also write directly to Supabase from client, but API routes let you control schema, validate, and avoid exposing too much.)

---

# Cursor build starter pack

## A) What I need from you next

When you paste your previous years’ questions, include:

- the question text
- all options
- which option is correct (if graded)
- explanation text (if you have it; if not, we can draft)
- topic tag per question (even rough)
- which profession/profile condition it belongs to (if any)

That’s enough to generate the question bank file.

## B) Cursor “Project Prompt” (copy/paste)

Use this in Cursor to scaffold the project.

```text
Build a SvelteKit + TypeScript web app: “Ausmed CPD Quiz” (formative quiz).

Core requirements:
- Mobile-first, accessible UI.
- Flow: Intro -> Profile Setup (3–5 questions) -> Quiz (12–18 core questions) -> Results screen.
- Question types v1:
  - Graded: single-correct MCQ and True/False
  - Ungraded: short text reflection with example answer shown after submit
- Immediate feedback after each submitted question:
  - Show correct/incorrect, correct answer, and an explanation block.
- Profile produces a `profile` object and the quiz questions shown are filtered by profile.
- Quiz scoring:
  - Only graded questions count.
  - Provide overall score + topic breakdown.
- Results screen:
  - Show completion success state
  - Show score + topic breakdown
  - Show tailored CTA copy to a free CPD course based on score threshold
  - Provide a static PDF checklist download link
  - Provide share button (Web Share API + copy-link fallback)
  - Display compliance note: “Always confirm with AHPRA. Last reviewed: {date}.”
- Retake allowed: resets session and generates new question order (seeded shuffle).
- Nice-to-have: seeded shuffle for question order; optional shuffle for MCQ options.

Data + analytics (must have):
- Persist anonymous quiz performance for quant analysis using Supabase Postgres.
- Create tables: quiz_sessions, quiz_answers (and optionally quiz_events).
- Create SvelteKit API routes:
  - POST /api/session/start
  - POST /api/session/profile
  - POST /api/session/answer
  - POST /api/session/complete
- Store:
  - sessionId uuid, seed, created_at, completed_at, last_seen_at
  - profile json
  - each answer with question_id, selected_option_id, is_correct (nullable for text), time_ms
  - computed overall score and topic scores at completion (store in sessions row or separate column)
- Do not collect email or name.

Implementation notes:
- Question bank should live in `src/lib/questions.ts` (typed).
- CPD rules config should live in `src/lib/config/rules.ts` with:
  - lastReviewed date string
  - sources list with URLs
  - helper function computeRequiredHours(profile)
- Use a simple design system:
  - components: Button, Card, Progress, RadioGroup, FeedbackPanel
  - consistent spacing and typography
- Ensure keyboard nav and screen reader support (fieldset/legend for radio groups, aria-live for feedback).
- Provide a clean file structure and README with local dev + env var setup.

Deliver:
- Working app with mocked questions (use placeholder questions for now), ready for me to paste in real question content.
```

## C) Supabase env vars Cursor should expect

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- (If using service role in server routes, better) `SUPABASE_SERVICE_ROLE_KEY` (keep server-only)

If you don’t want a service role key in server routes, you’ll need RLS policies that allow inserts for anonymous sessions. I’d rather do service-role server-side inserts (safer + simpler) and keep RLS strict.

---

# One call you still need to make (so you don’t regret it)

**Back navigation rule:** I recommend:

- Users can go back to _review_ previous explanations,
- but once they submit an answer it’s locked (no changes).

This avoids people “correcting” their path and polluting your quant data, while still reducing frustration.
