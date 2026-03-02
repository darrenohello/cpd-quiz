// src/lib/questions.ts
// Full 2025 set, refactored for 2026 SvelteKit formative quiz + survey hybrid.
//
// Key refactors vs Typeform:
// - “XB” follow-up explanation screens are represented as `type: "info"` items
//   with `show: "after:<questionId>"`. Your app can render these inline after submit,
//   rather than as separate navigation steps.
// - Graded questions are explicitly marked with `graded: true` + `correctOptionId`.
// - Survey / qual items remain ungraded but are still first-class questions.
// - Conditional text questions (Q4/Q5) are driven by visibility predicates based on answers.
//
// You can later:
// - Move profile questions into a dedicated setup flow (still same IDs for analytics comparability).
// - Choose a “core” subset for the graded quiz (e.g., 12–18) while still capturing all survey items.

export const QUIZ_META = {
  campaignKey: "cpd-quiz",
  year: 2026,
  questionSetVersion: "2025-import.v1",
  title: "CPD Requirements Check",
} as const;

export type Profession = "RN" | "RM" | "EN" | "Other";
export type RegistrationType =
  | "GeneralPractising"
  | "NonPractising"
  | "Provisional"
  | "Student"
  | "NotSure";

export type Topic =
  | "profile"
  | "audit"
  | "deadlines"
  | "hours_and_proration"
  | "context_and_relevance"
  | "planning_and_goals"
  | "evidence_and_records"
  | "declarations_and_audit"
  | "behaviour"
  | "impact_reflection"
  | "open_feedback"
  | "info";

export type QuestionType =
  | "profile_radio"
  | "mcq_single"
  | "tf_single"
  | "likert_5"
  | "text"
  | "info";

export type Option = { id: string; label: string };

export type AnswerValue =
  | { kind: "option"; optionId: string }
  | { kind: "text"; text: string };

export type Profile = {
  profession?: Profession;
  registrationType?: RegistrationType;
  // Reserved for 2026+ (not used in 2025 set but you mentioned wanting this):
  endorsementsCount?: 0 | 1 | 2 | 3;
  gradMonthsRegistered?: 0 | 3 | 6 | 9 | 12;
};

export type AnswerMap = Record<string, AnswerValue | undefined>;

export type VisibilityFn = (ctx: { profile: Profile; answers: AnswerMap }) => boolean;

export type BaseQuestion = {
  id: string;
  type: QuestionType;
  topic: Topic;
  prompt: string;
  helperText?: string;

  // For analytics / comparability / filtering:
  tags?: string[];

  // Conditional inclusion
  isVisible?: VisibilityFn;

  // Presentation hints (your UI can ignore these if you want)
  showIn?: "profile" | "core_quiz" | "survey" | "any";
};

export type ChoiceQuestion = BaseQuestion & {
  type: "profile_radio" | "mcq_single" | "tf_single" | "likert_5";
  options: Option[];
  graded?: boolean; // only true for scored questions
  correctOptionId?: string; // required when graded=true
  explanation?: string; // shown after submit (formative)
};

export type TextQuestion = BaseQuestion & {
  type: "text";
  placeholder?: string;
  exampleAnswer?: string; // shown after submit (ungraded)
  explanation?: string; // shown after submit
};

export type InfoQuestion = BaseQuestion & {
  type: "info";
  body: string;
  // When to display this info card:
  // - "standalone": treat as a step (Typeform-style)
  // - "after:<questionId>": show inline after that question is submitted
  show: "standalone" | `after:${string}`;
};

export type Question = ChoiceQuestion | TextQuestion | InfoQuestion;

const opt = (id: string, label: string): Option => ({ id, label });

const answeredOptionIs =
  (questionId: string, optionId: string): VisibilityFn =>
  ({ answers }) =>
    answers[questionId]?.kind === "option" && answers[questionId]?.optionId === optionId;

export const QUESTIONS_2025_FULL: Question[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // CPD Req — Profile
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "q1_primary_profession",
    type: "profile_radio",
    topic: "profile",
    showIn: "profile",
    prompt: "What’s your primary profession?",
    helperText:
      "Understanding your primary profession is critical as it will help determine how much CPD you need to complete (your CPD hours).",
    options: [
      opt("RN", "Registered Nurse (RN)"),
      opt("RM", "Registered Midwife (RM)"),
      opt("EN", "Enrolled Nurse (EN)"),
      opt("Other", "Other"),
    ],
    // Not graded — profile segmentation only
    graded: false,
    tags: ["2025", "comparability_profile"],
  },

  {
    id: "q2_registration_type",
    type: "profile_radio",
    topic: "profile",
    showIn: "profile",
    prompt: "What is your registration type?",
    options: [
      opt("GeneralPractising", "General registration (practicing)"),
      opt("NonPractising", "Non-practicing"),
      opt("Provisional", "Provisional registration"),
      opt("Student", "Student"),
      opt("NotSure", "I'm not sure"),
    ],
    graded: false,
    tags: ["2025", "comparability_profile"],
  },

  // Typeform “2B” info screen — treat as inline info after Q2 submit
  {
    id: "q2b_registration_type_info",
    type: "info",
    topic: "info",
    showIn: "profile",
    prompt: "Registration Type",
    body:
      "Did you know that you still need to meet CPD requirements while on maternity leave, travelling overseas or taking career breaks if your registration type is still ‘practicing’?\n\n" +
      "You may request to register as ‘non-practicing’ — in this case, you do not need to complete CPD while you are on the non-practicing register.",
    show: "after:q2_registration_type",
    tags: ["2025", "info_card"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Audit experience (survey + conditional text)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "q3_ever_audited",
    type: "mcq_single",
    topic: "audit",
    showIn: "survey",
    prompt: "Have you ever been audited for CPD in the past?",
    options: [opt("Yes", "Yes"), opt("No", "No")],
    graded: false,
    tags: ["2025", "comparability_survey"],
  },

  {
    id: "q4_audit_evidence_submitted",
    type: "text",
    topic: "audit",
    showIn: "survey",
    prompt: "What evidence were you required to submit?",
    placeholder: "Write your answer here…",
    isVisible: answeredOptionIs("q3_ever_audited", "Yes"),
    tags: ["2025", "comparability_survey"],
  },

  {
    id: "q5_audit_evidence_expected",
    type: "text",
    topic: "audit",
    showIn: "survey",
    prompt: "If you were audited for CPD, what evidence do you think would be required?",
    placeholder: "Write your answer here…",
    isVisible: answeredOptionIs("q3_ever_audited", "No"),
    tags: ["2025", "comparability_survey"],
  },

  {
    id: "q6_audit_confidence",
    type: "likert_5",
    topic: "audit",
    showIn: "survey",
    prompt: "I feel confident I would pass a CPD audit",
    // Kept verbatim for comparability (even though it’s a bit odd)
    options: [
      opt("StronglyConfident", "Strongly Confident"),
      opt("Confident", "Confident"),
      opt("Neutral", "Neutral"),
      opt("NotConfident", "Not Confident"),
      opt("NotStronglyConfident", "Not Strongly Confident"),
    ],
    graded: false,
    tags: ["2025", "comparability_survey"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Core knowledge (graded formative)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "q7_cpd_deadline",
    type: "mcq_single",
    topic: "deadlines",
    showIn: "core_quiz",
    prompt: "When do you need to complete all your CPD by?",
    options: [
      opt("A", "1 January"),
      opt("B", "31 December"),
      opt("C", "30 June"),
      opt("D", "31 May"),
      opt("E", "Not sure"),
    ],
    graded: true,
    correctOptionId: "D",
    explanation:
      "The Nursing and Midwifery Board of Australia’s registration period is 1 June – 31 May. " +
      "This means that the CPD deadline for nurses and midwives is 31 May each year.",
    tags: ["2025", "comparability_core"],
  },

  {
    id: "q8_confident_hours",
    type: "likert_5",
    topic: "hours_and_proration",
    showIn: "survey",
    prompt: "I’m confident I know exactly how much CPD I need to complete each year",
    options: [
      opt("StronglyAgree", "Strongly agree"),
      opt("Agree", "Agree"),
      opt("Neutral", "Neither agree nor disagree"),
      opt("Disagree", "Disagree"),
      opt("StronglyDisagree", "Strongly disagree"),
    ],
    graded: false,
    tags: ["2025", "comparability_survey"],
  },

  // Former 8B explanatory screen — keep as info card, shown after Q8
  {
    id: "q8b_cpd_hours_info",
    type: "info",
    topic: "info",
    showIn: "survey",
    prompt: "CPD hours",
    body:
      "The total CPD hours required for nurses and midwives is different according to your profession and registration type. " +
      "Additional CPD will be required if you hold a dual registration (e.g., registered midwife and nurse) or if you hold any endorsements (for example, as a nurse practitioner).\n\n" +
      "Generally, a minimum of 20 hours is required. If you have an endorsement there will be an additional minimum 10 hours requirement per endorsement.",
    show: "after:q8_confident_hours",
    tags: ["2025", "info_card"],
  },

  {
    id: "q9_prorata_relevance",
    type: "mcq_single",
    topic: "hours_and_proration",
    showIn: "core_quiz",
    prompt: "True or false: Pro-rata CPD is only relevant to newly graduated students",
    options: [opt("True", "True"), opt("False", "False"), opt("NotSure", "Not sure")],
    graded: true,
    correctOptionId: "False",
    explanation:
      "Pro-rata CPD is relevant to any practitioner who has held a registration for less than 12 months prior to renewal. " +
      "This commonly includes students, but can also apply if you changed registration type during a registration period.\n\n" +
      "It may also be relevant if, during the registration period, you gained an endorsement.",
    tags: ["2025", "comparability_core"],
  },

  {
    id: "q10_context_vs_scope",
    type: "mcq_single",
    topic: "context_and_relevance",
    showIn: "core_quiz",
    prompt: "True or false: Your context of practice is the same as your scope of practice",
    options: [opt("True", "True"), opt("False", "False"), opt("NotSure", "Not sure")],
    graded: true,
    correctOptionId: "False",
    explanation:
      "Context of practice is not the same as scope of practice.\n\n" +
      "Context of practice refers to the conditions that define an individual’s practice (setting, population, focus, complexity). " +
      "Scope of practice is the professional role and services an individual is trained, qualified, and competent to perform.\n\n" +
      "CPD must be relevant to a practitioner’s identified context of practice.",
    tags: ["2025", "comparability_core"],
  },

  {
    id: "q11_mandatory_training_counts",
    type: "mcq_single",
    topic: "context_and_relevance",
    showIn: "core_quiz",
    prompt: "True or false: All mandatory training can count towards your CPD.",
    options: [opt("True", "True"), opt("False", "False"), opt("NotSure", "Not sure")],
    graded: true,
    correctOptionId: "False",
    explanation:
      "Mandatory training activities in the workplace may count as CPD if they are relevant to your context of practice and include new learning.\n\n" +
      "You must be able to demonstrate they improve your knowledge, expertise, and competence, and relate to an identified learning goal.",
    tags: ["2025", "comparability_core"],
  },

  {
    id: "q12_cpd_throughout_year",
    type: "mcq_single",
    topic: "behaviour",
    showIn: "survey",
    prompt: "Do you complete CPD throughout the CPD year?",
    options: [
      opt("ThroughoutYear", "Yes, I usually complete CPD throughout the year"),
      opt("LeaveToDeadline", "No, I tend to leave it to the CPD deadline"),
    ],
    graded: false,
    tags: ["2025", "comparability_survey"],
  },

  {
    id: "q12b_throughout_year_info",
    type: "info",
    topic: "info",
    showIn: "survey",
    prompt: "Completing CPD throughout the CPD year",
    body:
      "Did you know that the NMBA needs you to engage in CPD activities throughout a registration period? " +
      "This means you are encouraged to spread your CPD activities over the course of the year.\n\n" +
      "Learning and development occurs throughout your career. CPD supports ongoing competence to practice.",
    show: "after:q12_cpd_throughout_year",
    tags: ["2025", "info_card"],
  },

  {
    id: "q13_learning_plan_definition",
    type: "mcq_single",
    topic: "planning_and_goals",
    showIn: "core_quiz",
    prompt: "What is a learning plan?",
    options: [
      opt("A", "A set of goals I have set for myself that I want to achieve through learning."),
      opt(
        "B",
        "A document that outlines identified goals and proposed resources relating to my knowledge gaps and context of practice."
      ),
      opt(
        "C",
        "A list of potential learning activities that I might complete over the year to improve my skills and knowledge."
      ),
      opt("D", "A list of completed learning activities from a previous registration period"),
      opt("E", "Not sure"),
    ],
    graded: true,
    correctOptionId: "B",
    explanation:
      "A learning plan outlines identified goals and proposed resources relating to your knowledge gaps and context of practice.\n\n" +
      "A describes learning goals only. C is only a list of resources. D is a summary of past activities.",
    tags: ["2025", "comparability_core"],
  },

  {
    id: "q14_up_to_date_learning_goals",
    type: "likert_5",
    topic: "planning_and_goals",
    showIn: "survey",
    prompt: "I make sure I have up to date learning goals each CPD year",
    options: [
      opt("Never", "Never"),
      opt("Rarely", "Rarely"),
      opt("Sometimes", "Sometimes"),
      opt("Often", "Often"),
      opt("Always", "Always"),
    ],
    graded: false,
    tags: ["2025", "comparability_survey"],
  },

  {
    id: "q15_plan_resources_aligned",
    type: "likert_5",
    topic: "planning_and_goals",
    showIn: "survey",
    prompt: "Each CPD year I plan out specific resources that align with my learning goals",
    options: [
      opt("Never", "Never"),
      opt("Rarely", "Rarely"),
      opt("Sometimes", "Sometimes"),
      opt("Often", "Often"),
      opt("Always", "Always"),
    ],
    graded: false,
    tags: ["2025", "comparability_survey"],
  },

  {
    id: "q15b_learning_plans_info",
    type: "info",
    topic: "info",
    showIn: "survey",
    prompt: "Learning Plans",
    body:
      "Research on CPD shows that planning CPD results in positive learning outcomes and evidence-based changes to practice.\n\n" +
      "CPD is more effective when it involves planning and reflection of learning goals. You can get more benefit by identifying learning goals and planning relevant activities to meet them.",
    show: "after:q15_plan_resources_aligned",
    tags: ["2025", "info_card"],
  },

  {
    id: "q16_review_prior_goals",
    type: "likert_5",
    topic: "planning_and_goals",
    showIn: "survey",
    prompt: "I review my prior learning goals at the end of each CPD year",
    options: [
      opt("StronglyAgree", "Strongly agree"),
      opt("Agree", "Agree"),
      opt("Neutral", "Neither agree nor disagree"),
      opt("Disagree", "Disagree"),
      opt("StronglyDisagree", "Strongly disagree"),
    ],
    graded: false,
    tags: ["2025", "comparability_survey"],
  },

  {
    id: "q16b_review_goals_info",
    type: "info",
    topic: "info",
    showIn: "survey",
    prompt: "Reviewing learning goals at the end of each CPD year",
    body:
      "Reflection on your learning — including what you achieved and applied to practice — can be helpful at the end of each CPD year.\n\n" +
      "Unmet learning goals may contribute to next year’s goals as part of an ongoing CPD cycle. Regular reviews can also help ensure CPD stays relevant to your current context of practice.",
    show: "after:q16_review_prior_goals",
    tags: ["2025", "info_card"],
  },

  {
    id: "q17_certificates_only_evidence",
    type: "mcq_single",
    topic: "evidence_and_records",
    showIn: "core_quiz",
    prompt:
      "True or false: Certificates are the only the evidence I am required to show if I am audited for CPD",
    options: [opt("True", "True"), opt("False", "False"), opt("NotSure", "Not sure")],
    graded: true,
    correctOptionId: "False",
    explanation:
      "You must keep records of your CPD activities and have evidence available if you are audited.\n\n" +
      "A certificate can be accepted evidence, but you may also need documentation of the identified learning need, your learning plan, participation, and reflection on outcomes (including relevance to practice).",
    tags: ["2025", "comparability_core"],
  },

  {
    id: "q18_activities_that_count",
    type: "text",
    topic: "hours_and_proration",
    showIn: "survey",
    prompt: "What types of activities can count towards your CPD progress?",
    placeholder: "Write your answer here…",
    tags: ["2025", "comparability_survey"],
  },

  {
    id: "q19_when_confirm_met_requirements",
    type: "mcq_single",
    topic: "declarations_and_audit",
    showIn: "core_quiz",
    prompt: "When do you confirm you have met all your CPD requirements?",
    options: [
      opt("A", "During a performance appraisal"),
      opt("B", "On my CV"),
      opt("C", "At renewal of registration"),
      opt("D", "At the end of each calendar year"),
      opt("E", "I’m not sure"),
    ],
    graded: true,
    correctOptionId: "C",
    explanation:
      "Each year, at renewal of registration (and/or endorsement), you are required to declare that you have complied with the registration standard: continuing professional development.\n\n" +
      "It’s essential to understand requirements beyond hours — including planning, reflection, and relevance to context of practice.",
    tags: ["2025", "comparability_core"],
  },

  {
    id: "q20_years_keep_records",
    type: "mcq_single",
    topic: "evidence_and_records",
    showIn: "core_quiz",
    prompt: "How many years do you need to keep records of CPD for?",
    options: [opt("A", "7 years"), opt("B", "3 years"), opt("C", "5 years"), opt("D", "10 years")],
    graded: true,
    correctOptionId: "C",
    explanation:
      "You must keep records of your CPD activities for a period of 5 years from the date you completed the CPD.\n\n" +
      "This may be required if you are audited or as part of an investigation (e.g., related to a notification/complaint).",
    tags: ["2025", "comparability_core"],
  },

  {
    id: "q21_change_in_practice",
    type: "text",
    topic: "impact_reflection",
    showIn: "survey",
    prompt:
      "What is one change in practice you have implemented as a result of a recent CPD activity?",
    placeholder: "Write your answer here…",
    tags: ["2025", "comparability_survey"],
  },

  {
    id: "q22_evaluating_impact_info",
    type: "info",
    topic: "info",
    showIn: "survey",
    prompt: "Evaluating impact of CPD",
    body:
      "Evaluating the impact of education on your practice is a key requirement to ensure you are engaging in a rich educational experience and that your CPD leads to an improvement in practice.",
    // In Typeform this was a standalone info screen; in-app, best shown after Q21 submit.
    show: "after:q21_change_in_practice",
    tags: ["2025", "info_card"],
  },

  {
    id: "q23_questions_or_comments",
    type: "text",
    topic: "open_feedback",
    showIn: "survey",
    prompt: "Do you have any questions or comments?",
    placeholder: "Write your answer here…",
    tags: ["2025", "comparability_survey"],
  },
];

// Convenience exports your app will likely use
export const ALL_QUESTIONS = QUESTIONS_2025_FULL;

// A sensible “core graded” set for v1 (keeps 2025 comparability and stays short).
// You can still add 2026 dynamic questions alongside these later.
export const CORE_GRADED_QUESTION_IDS: string[] = [
  "q7_cpd_deadline",
  "q9_prorata_relevance",
  "q10_context_vs_scope",
  "q11_mandatory_training_counts",
  "q13_learning_plan_definition",
  "q17_certificates_only_evidence",
  "q19_when_confirm_met_requirements",
  "q20_years_keep_records",
];

// Optional: include some survey items for the “insight” section after the core quiz.
// You can reorder these in the UI, but keeping IDs stable preserves comparability.
export const SURVEY_QUESTION_IDS: string[] = [
  "q3_ever_audited",
  "q4_audit_evidence_submitted",
  "q5_audit_evidence_expected",
  "q6_audit_confidence",
  "q8_confident_hours",
  "q12_cpd_throughout_year",
  "q14_up_to_date_learning_goals",
  "q15_plan_resources_aligned",
  "q16_review_prior_goals",
  "q18_activities_that_count",
  "q21_change_in_practice",
  "q23_questions_or_comments",
];

// Helper to resolve visibility (useful in your selector)
export function isQuestionVisible(q: Question, ctx: { profile: Profile; answers: AnswerMap }): boolean {
  return q.isVisible ? q.isVisible(ctx) : true;
}
