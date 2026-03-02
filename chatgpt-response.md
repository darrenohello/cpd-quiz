I gave this prompt to ChatGPT along with the questions in `2025-questions.md`.

> Here are the questions from 2025. Note that this as well as the year prior when it was first run was motivated by understanding our users and their level of knowledge. It was at a time where there was more of a company strategic focus on B2C and growing it. I saw CPD levels of understanding as a bottleneck - the more people understand their requirements, the more likely they are to fufill them and use Ausmed to do so. That's why many of the questions are framed a bit more like a qual survey as opposed to a pure formative quiz. I'd still like to try to include many of these questions so that we can compare results from previous years. That said, I'm happy to shelve some of them if they no longer feel appropriate for this year. We are no long focussing much effort on B2C, but I think given we've run this in the past, I'd like to do so again.

ChatGPT's response is below:

---

This set is totally workable — but you’re right: it’s a **hybrid** of (a) formative quiz and (b) “state of understanding” survey. If you try to force _all_ of it into a single “graded quiz” loop, the UX will feel messy and your analytics will get muddy.

The clean v1 approach (keeps year-on-year comparability **and** gives a good formative experience):

## Recommended v1 structure

### Part 1 — Profile (setup, not graded)

Keep these early because they drive conditional logic and help segment analytics:

- **Q1** Primary profession (RN/RM/EN/Other)
- **Q2** Registration type (General / Non-practising / Provisional / Student / Not sure)

Optional (depending on how deep you go on rule-calcs this year):

- Graduate / time registered (new question you mentioned)
- Endorsements count (new question you mentioned)

### Part 2 — Core formative quiz (graded)

This is your 12–18 question “core”, immediate feedback.

Good candidates from your 2025 set:

- **Q7** CPD deadline (graded MCQ)
- **Q9** Pro-rata CPD relevance (graded T/F/Not sure)
- **Q10** Context vs scope (graded T/F/Not sure)
- **Q11** Mandatory training counts (graded T/F/Not sure)
- **Q13** What is a learning plan (graded MCQ)
- **Q17** Certificates only evidence (graded T/F/Not sure)
- **Q19** When you confirm CPD requirements (graded MCQ)
- **Q20** How long keep records (graded MCQ)

That’s **8 graded questions** already.

Then add the dynamic/profile-specific questions you _want_ this year (after you verify AHPRA rules):

- “How many hours do you need?” (graded)
- endorsement add-on hours (graded)
- graduate pro-rata based on quarters/months (graded)
  These become the “dynamic” portion and make the quiz feel personalised.

### Part 3 — Survey + reflection (not graded, but recorded)

This preserves your “knowledge bottleneck” insight and keeps comparisons alive without wrecking the graded flow.

Include:

- **Q3** audited before? (yes/no)
- **Q4/Q5** evidence submitted / evidence expected (text)
- **Q6** confidence passing audit (Likert)
- **Q8** confidence knowing required hours (Likert)
- **Q12** do CPD throughout year? (behaviour)
- **Q14/Q15/Q16** planning + learning goals behaviours (Likert)
- **Q18** what activities count? (text)
- **Q21** change in practice (text)
- **Q23** comments (text)

Also keep your informative “info cards” (like 2B, 12B, 15B, 16B, 22) but treat them as:

- either **explanations shown after relevant questions**, or
- **interstitial tips** in the survey/reflection section.

This way:

- the quiz stays punchy and game-like,
- you still capture the comparability data you care about,
- and your analytics can cleanly separate _knowledge_ vs _attitudes/behaviours_.

---

## What I’d shelve (unless you have a strong reason)

- **2B as a standalone step**. Make it a conditional info card that appears only when:
  - registration type is “General practising” (or “I’m not sure”), OR
  - user answers something wrong later about CPD while on leave.
    Standalone “Did you know…” steps increase dropoff.

---

## Topic tags (for your topic breakdown)

Assign each graded question a single topic (keep it simple v1):

- `deadlines`
- `hours_and_proration`
- `context_and_relevance`
- `planning_and_goals`
- `evidence_and_records`
- `declarations_and_audit`

Example mapping:

- Q7 → `deadlines`
- Q9 → `hours_and_proration`
- Q10, Q11 → `context_and_relevance`
- Q13 → `planning_and_goals`
- Q17, Q20 → `evidence_and_records`
- Q19 → `declarations_and_audit`

---

## Branching level (re your earlier point)

What you’ve described is basically **Level 1** (profile-gated pool + variable piping).
You can still add a _tiny_ amount of Level 2 without complexity:

- If user gets Q7 wrong → show “deadline reminder” on results CTA copy.
- If user gets evidence/records questions wrong → push the CPD course + checklist harder.
  That’s still mostly “results messaging”, not question-branching.

---

# Cursor-ready question schema (TypeScript)

This is the core thing Cursor needs so it doesn’t hardcode your logic badly.

### Question types you need v1

- `profile_radio`
- `graded_mcq`
- `graded_tf` (still just MCQ under the hood)
- `survey_likert`
- `text_reflection`

### Suggested TS shapes (keep it strict, but not overengineered)

```ts
export type Topic =
  | "deadlines"
  | "hours_and_proration"
  | "context_and_relevance"
  | "planning_and_goals"
  | "evidence_and_records"
  | "declarations_and_audit"
  | "survey";

export type QuestionType =
  | "profile_radio"
  | "graded_mcq"
  | "survey_likert"
  | "text_reflection";

export type Profile = {
  profession?: "RN" | "RM" | "EN" | "Other";
  registrationType?:
    | "General"
    | "NonPractising"
    | "Provisional"
    | "Student"
    | "NotSure";
  // optional v1+:
  endorsementsCount?: 0 | 1 | 2 | 3;
  gradMonthsRegistered?: 0 | 3 | 6 | 9 | 12; // or whatever buckets you choose
};

export type Visibility = {
  anyProfession?: Profile["profession"][];
  anyRegistrationType?: Profile["registrationType"][];
  // optional later:
  // predicateKey?: string; // if you want to reference a predicate map instead of embedding functions
};

export type Option = { id: string; label: string };

export type BaseQuestion = {
  id: string;
  type: QuestionType;
  topic: Topic;
  prompt: string;
  helperText?: string;
  visibility?: Visibility;
};

export type ProfileRadioQuestion = BaseQuestion & {
  type: "profile_radio";
  profileKey: keyof Profile;
  options: Option[];
};

export type GradedMcqQuestion = BaseQuestion & {
  type: "graded_mcq";
  options: Option[];
  correctOptionId: string;
  explanation: string;
  // if you want “Not sure” options: include it in options, but it’s never correct
};

export type SurveyLikertQuestion = BaseQuestion & {
  type: "survey_likert";
  scale: Option[]; // e.g. Strongly agree ... Strongly disagree
  // no correct answer
};

export type TextReflectionQuestion = BaseQuestion & {
  type: "text_reflection";
  placeholder?: string;
  exampleAnswer?: string; // shown after submit
  explanation?: string; // optional “why we ask this”
};

export type Question =
  | ProfileRadioQuestion
  | GradedMcqQuestion
  | SurveyLikertQuestion
  | TextReflectionQuestion;
```

This schema supports everything you listed without locking you into future pain.

---

# How I’d translate your 2025 questions into v1 (draft mapping)

## Profile (setup)

- Q1 → `profile_radio` (`profileKey: profession`)
- Q2 → `profile_radio` (`profileKey: registrationType`)

## Graded core quiz (keep for comparability)

- Q7 → `graded_mcq`
- Q9 → `graded_mcq` with options True/False/Not sure, correct = False
- Q10 → same, correct = False
- Q11 → same, correct = False
- Q13 → `graded_mcq`, correct = B
- Q17 → `graded_mcq`, correct = False
- Q19 → `graded_mcq`, correct = C
- Q20 → `graded_mcq`, correct = C

## Survey/reflection section (for comparability + insight)

- Q3 → could be `profile_radio` but stored as “survey answer” (don’t mix into profile object unless needed)
- Q4/Q5 → `text_reflection` (visibility depends on Q3 response)
- Q6 → `survey_likert` (but your labels are slightly off; see note below)
- Q8 → `survey_likert`
- Q12 → `graded_mcq`? No — it’s behavioural, keep as survey MCQ (ungraded)
- Q14/Q15/Q16 → `survey_likert`
- Q18/Q21/Q23 → `text_reflection`
- 2B, 12B, 15B, 16B, 22 → “info cards” (I’d implement as `explanation` blocks shown contextually, not separate question IDs)

### Quick note: your Likert labels

For Q6 you have “Strongly Confident / Not Strongly Confident” which is awkward and not a standard scale.
If you want year-on-year comparability, keep it identical.
If you’re okay with changing it, use:

- Strongly agree / Agree / Neutral / Disagree / Strongly disagree
  or
- Very confident / Confident / Neutral / Not confident / Not at all confident

---

# Analytics spec (so your quant analysis stays clean)

Because you want comparison across years, **lock these now**:

### Store both:

1. **Raw answers**
2. **Derived metrics** (overall score, topic scores)

### Minimum per answer row:

- `question_id`
- `question_type`
- `topic`
- `response_value` (option id or text)
- `is_correct` (nullable)
- `time_ms`

### Minimum per session:

- `year` (hardcode “2026” in config)
- `question_set_version` (e.g. “v1.0.0”) — very useful for comparing if you tweak wording
- `seed`
- `profile`
- `selected_core_question_ids[]` (critical if randomisation is used)

If you don’t store the chosen question IDs, your analysis gets sketchy fast.

---

# What Cursor still needs from you before it can build “real”

Two things:

1. **Which questions must remain identical for comparability**
   - e.g., “Keep Q7/Q9/Q10/Q11/Q13/Q17/Q19/Q20/Q6/Q8/Q12/Q14-16 as-is”
   - Everything else we can refine.

2. **Your 2026 question plan**
   - Are you adding the dynamic “required hours” questions this year? (You said yes, pending verification.)
   - If yes, give me the draft _buckets_ you intend (RN/RM/EN, endorsements count buckets, grad time buckets). Even if the numbers are placeholders for now, we can structure it.

---

## Next step

If you want, paste this same list again but with:

- the **correct option marked** for all graded ones (you already did for most),
- and confirm which Likert scales you want to keep unchanged for comparability.

Then I’ll produce:

- a ready-to-drop `src/lib/questions.ts` containing **your full 2025 set** (properly typed, with visibility rules),
- a `topics.ts` mapping,
- and a recommended `coreQuiz.ts` selector that reliably outputs 12–18 core questions while keeping your “comparison set” always included.
