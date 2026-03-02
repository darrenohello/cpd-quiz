import { a0 as attr, a1 as attr_class, s as slot, a2 as stringify, e as escape_html, a3 as ensure_array_like, a4 as attr_style, $ as derived } from "../../chunks/index.js";
import "clsx";
const QUIZ_META = {
  title: "CPD Requirements Check"
};
const opt = (id, label) => ({ id, label });
const answeredOptionIs = (questionId, optionId) => ({ answers }) => answers[questionId]?.kind === "option" && answers[questionId]?.optionId === optionId;
const QUESTIONS_2025_FULL = [
  {
    id: "q1_primary_profession",
    type: "profile_radio",
    topic: "profile",
    showIn: "profile",
    prompt: "What's your primary profession?",
    helperText: "Understanding your primary profession is critical as it will help determine how much CPD you need to complete (your CPD hours).",
    options: [
      opt("RN", "Registered Nurse (RN)"),
      opt("RM", "Registered Midwife (RM)"),
      opt("EN", "Enrolled Nurse (EN)"),
      opt("Other", "Other")
    ],
    graded: false,
    tags: ["2025", "comparability_profile"]
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
      opt("NotSure", "I'm not sure")
    ],
    graded: false,
    tags: ["2025", "comparability_profile"]
  },
  {
    id: "q2b_registration_type_info",
    type: "info",
    topic: "info",
    showIn: "profile",
    prompt: "Registration Type",
    body: "Did you know that you still need to meet CPD requirements while on maternity leave, travelling overseas or taking career breaks if your registration type is still 'practicing'?\n\nYou may request to register as 'non-practicing' — in this case, you do not need to complete CPD while you are on the non-practicing register.",
    show: "after:q2_registration_type",
    tags: ["2025", "info_card"]
  },
  {
    id: "q3_ever_audited",
    type: "mcq_single",
    topic: "audit",
    showIn: "survey",
    prompt: "Have you ever been audited for CPD in the past?",
    options: [opt("Yes", "Yes"), opt("No", "No")],
    graded: false,
    tags: ["2025", "comparability_survey"]
  },
  {
    id: "q4_audit_evidence_submitted",
    type: "text",
    topic: "audit",
    showIn: "survey",
    prompt: "What evidence were you required to submit?",
    placeholder: "Write your answer here…",
    isVisible: answeredOptionIs("q3_ever_audited", "Yes"),
    tags: ["2025", "comparability_survey"]
  },
  {
    id: "q5_audit_evidence_expected",
    type: "text",
    topic: "audit",
    showIn: "survey",
    prompt: "If you were audited for CPD, what evidence do you think would be required?",
    placeholder: "Write your answer here…",
    isVisible: answeredOptionIs("q3_ever_audited", "No"),
    tags: ["2025", "comparability_survey"]
  },
  {
    id: "q6_audit_confidence",
    type: "likert_5",
    topic: "audit",
    showIn: "survey",
    prompt: "I feel confident I would pass a CPD audit",
    options: [
      opt("StronglyConfident", "Strongly Confident"),
      opt("Confident", "Confident"),
      opt("Neutral", "Neutral"),
      opt("NotConfident", "Not Confident"),
      opt("NotStronglyConfident", "Not Strongly Confident")
    ],
    graded: false,
    tags: ["2025", "comparability_survey"]
  },
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
      opt("E", "Not sure")
    ],
    graded: true,
    correctOptionId: "D",
    explanation: "The Nursing and Midwifery Board of Australia's registration period is 1 June – 31 May. This means that the CPD deadline for nurses and midwives is 31 May each year.",
    tags: ["2025", "comparability_core"]
  },
  {
    id: "q8_confident_hours",
    type: "likert_5",
    topic: "hours_and_proration",
    showIn: "survey",
    prompt: "I'm confident I know exactly how much CPD I need to complete each year",
    options: [
      opt("StronglyAgree", "Strongly agree"),
      opt("Agree", "Agree"),
      opt("Neutral", "Neither agree nor disagree"),
      opt("Disagree", "Disagree"),
      opt("StronglyDisagree", "Strongly disagree")
    ],
    graded: false,
    tags: ["2025", "comparability_survey"]
  },
  {
    id: "q8b_cpd_hours_info",
    type: "info",
    topic: "info",
    showIn: "survey",
    prompt: "CPD hours",
    body: "The total CPD hours required for nurses and midwives is different according to your profession and registration type. Additional CPD will be required if you hold a dual registration (e.g., registered midwife and nurse) or if you hold any endorsements (for example, as a nurse practitioner).\n\nGenerally, a minimum of 20 hours is required. If you have an endorsement there will be an additional minimum 10 hours requirement per endorsement.",
    show: "after:q8_confident_hours",
    tags: ["2025", "info_card"]
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
    explanation: "Pro-rata CPD is relevant to any practitioner who has held a registration for less than 12 months prior to renewal. This commonly includes students, but can also apply if you changed registration type during a registration period.\n\nIt may also be relevant if, during the registration period, you gained an endorsement.",
    tags: ["2025", "comparability_core"]
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
    explanation: "Context of practice is not the same as scope of practice.\n\nContext of practice refers to the conditions that define an individual's practice (setting, population, focus, complexity). Scope of practice is the professional role and services an individual is trained, qualified, and competent to perform.\n\nCPD must be relevant to a practitioner's identified context of practice.",
    tags: ["2025", "comparability_core"]
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
    explanation: "Mandatory training activities in the workplace may count as CPD if they are relevant to your context of practice and include new learning.\n\nYou must be able to demonstrate they improve your knowledge, expertise, and competence, and relate to an identified learning goal.",
    tags: ["2025", "comparability_core"]
  },
  {
    id: "q12_cpd_throughout_year",
    type: "mcq_single",
    topic: "behaviour",
    showIn: "survey",
    prompt: "Do you complete CPD throughout the CPD year?",
    options: [
      opt("ThroughoutYear", "Yes, I usually complete CPD throughout the year"),
      opt("LeaveToDeadline", "No, I tend to leave it to the CPD deadline")
    ],
    graded: false,
    tags: ["2025", "comparability_survey"]
  },
  {
    id: "q12b_throughout_year_info",
    type: "info",
    topic: "info",
    showIn: "survey",
    prompt: "Completing CPD throughout the CPD year",
    body: "Did you know that the NMBA needs you to engage in CPD activities throughout a registration period? This means you are encouraged to spread your CPD activities over the course of the year.\n\nLearning and development occurs throughout your career. CPD supports ongoing competence to practice.",
    show: "after:q12_cpd_throughout_year",
    tags: ["2025", "info_card"]
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
      opt("E", "Not sure")
    ],
    graded: true,
    correctOptionId: "B",
    explanation: "A learning plan outlines identified goals and proposed resources relating to your knowledge gaps and context of practice.\n\nA describes learning goals only. C is only a list of resources. D is a summary of past activities.",
    tags: ["2025", "comparability_core"]
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
      opt("Always", "Always")
    ],
    graded: false,
    tags: ["2025", "comparability_survey"]
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
      opt("Always", "Always")
    ],
    graded: false,
    tags: ["2025", "comparability_survey"]
  },
  {
    id: "q15b_learning_plans_info",
    type: "info",
    topic: "info",
    showIn: "survey",
    prompt: "Learning Plans",
    body: "Research on CPD shows that planning CPD results in positive learning outcomes and evidence-based changes to practice.\n\nCPD is more effective when it involves planning and reflection of learning goals. You can get more benefit by identifying learning goals and planning relevant activities to meet them.",
    show: "after:q15_plan_resources_aligned",
    tags: ["2025", "info_card"]
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
      opt("StronglyDisagree", "Strongly disagree")
    ],
    graded: false,
    tags: ["2025", "comparability_survey"]
  },
  {
    id: "q16b_review_goals_info",
    type: "info",
    topic: "info",
    showIn: "survey",
    prompt: "Reviewing learning goals at the end of each CPD year",
    body: "Reflection on your learning — including what you achieved and applied to practice — can be helpful at the end of each CPD year.\n\nUnmet learning goals may contribute to next year's goals as part of an ongoing CPD cycle. Regular reviews can also help ensure CPD stays relevant to your current context of practice.",
    show: "after:q16_review_prior_goals",
    tags: ["2025", "info_card"]
  },
  {
    id: "q17_certificates_only_evidence",
    type: "mcq_single",
    topic: "evidence_and_records",
    showIn: "core_quiz",
    prompt: "True or false: Certificates are the only the evidence I am required to show if I am audited for CPD",
    options: [opt("True", "True"), opt("False", "False"), opt("NotSure", "Not sure")],
    graded: true,
    correctOptionId: "False",
    explanation: "You must keep records of your CPD activities and have evidence available if you are audited.\n\nA certificate can be accepted evidence, but you may also need documentation of the identified learning need, your learning plan, participation, and reflection on outcomes (including relevance to practice).",
    tags: ["2025", "comparability_core"]
  },
  {
    id: "q18_activities_that_count",
    type: "text",
    topic: "hours_and_proration",
    showIn: "survey",
    prompt: "What types of activities can count towards your CPD progress?",
    placeholder: "Write your answer here…",
    tags: ["2025", "comparability_survey"]
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
      opt("E", "I'm not sure")
    ],
    graded: true,
    correctOptionId: "C",
    explanation: "Each year, at renewal of registration (and/or endorsement), you are required to declare that you have complied with the registration standard: continuing professional development.\n\nIt's essential to understand requirements beyond hours — including planning, reflection, and relevance to context of practice.",
    tags: ["2025", "comparability_core"]
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
    explanation: "You must keep records of your CPD activities for a period of 5 years from the date you completed the CPD.\n\nThis may be required if you are audited or as part of an investigation (e.g., related to a notification/complaint).",
    tags: ["2025", "comparability_core"]
  },
  {
    id: "q21_change_in_practice",
    type: "text",
    topic: "impact_reflection",
    showIn: "survey",
    prompt: "What is one change in practice you have implemented as a result of a recent CPD activity?",
    placeholder: "Write your answer here…",
    tags: ["2025", "comparability_survey"]
  },
  {
    id: "q22_evaluating_impact_info",
    type: "info",
    topic: "info",
    showIn: "survey",
    prompt: "Evaluating impact of CPD",
    body: "Evaluating the impact of education on your practice is a key requirement to ensure you are engaging in a rich educational experience and that your CPD leads to an improvement in practice.",
    show: "after:q21_change_in_practice",
    tags: ["2025", "info_card"]
  },
  {
    id: "q23_questions_or_comments",
    type: "text",
    topic: "open_feedback",
    showIn: "survey",
    prompt: "Do you have any questions or comments?",
    placeholder: "Write your answer here…",
    tags: ["2025", "comparability_survey"]
  }
];
const ALL_QUESTIONS = QUESTIONS_2025_FULL;
const CORE_GRADED_QUESTION_IDS = [
  "q7_cpd_deadline",
  "q9_prorata_relevance",
  "q10_context_vs_scope",
  "q11_mandatory_training_counts",
  "q13_learning_plan_definition",
  "q17_certificates_only_evidence",
  "q19_when_confirm_met_requirements",
  "q20_years_keep_records"
];
const SURVEY_QUESTION_IDS = [
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
  "q23_questions_or_comments"
];
function isQuestionVisible(q, ctx) {
  return q.isVisible ? q.isVisible(ctx) : true;
}
const CORE_COUNT = 15;
function seededShuffle(array, seed) {
  const arr = [...array];
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  const mul = 1103515245;
  const inc = 12345;
  let state2 = (h >>> 0) % 2147483647;
  for (let i = arr.length - 1; i > 0; i--) {
    state2 = state2 * mul + inc >>> 0;
    const j = state2 % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function getById(id) {
  return ALL_QUESTIONS.find((q) => q.id === id);
}
function getProfileQuestions() {
  return ALL_QUESTIONS.filter((q) => q.showIn === "profile");
}
function buildQuizQuestionList(profile, seed, surveyAnswers = {}) {
  const ctx = { profile, answers: surveyAnswers };
  const coreCandidates = CORE_GRADED_QUESTION_IDS.map((id) => getById(id)).filter(
    (q) => q != null
  );
  const shuffledCore = seededShuffle(coreCandidates, seed);
  const core = shuffledCore.slice(0, CORE_COUNT);
  const surveyCandidates = SURVEY_QUESTION_IDS.map((id) => getById(id)).filter(
    (q) => q != null && isQuestionVisible(q, ctx)
  );
  const survey = seededShuffle(surveyCandidates, seed + "-survey");
  return [...core, ...survey];
}
function getInfoAfterQuestion(questionId) {
  return ALL_QUESTIONS.find(
    (q) => q.type === "info" && q.show.startsWith("after:") && q.show === `after:${questionId}`
  );
}
function computeScore(questionList, answers) {
  const graded = questionList.filter(
    (q) => q.type !== "info" && q.type !== "text" && "graded" in q && q.graded === true
  );
  let correct = 0;
  const byTopic = /* @__PURE__ */ new Map();
  for (const q of graded) {
    if (q.type === "text" || q.type === "info") continue;
    const ans = answers[q.id];
    const selectedId = ans?.kind === "option" ? ans.optionId : void 0;
    const isCorrect = selectedId === q.correctOptionId;
    if (selectedId != null) {
      const total = (byTopic.get(q.topic)?.total ?? 0) + 1;
      const c = (byTopic.get(q.topic)?.correct ?? 0) + (isCorrect ? 1 : 0);
      byTopic.set(q.topic, { correct: c, total });
      if (isCorrect) correct++;
    }
  }
  const topicScores = Array.from(byTopic.entries()).filter(([, v]) => v.total > 0).map(([topic, v]) => ({ topic, correct: v.correct, total: v.total }));
  const overallTotal = graded.length;
  return {
    overallCorrect: correct,
    overallTotal,
    overallRatio: overallTotal > 0 ? correct / overallTotal : 0,
    topicScores
  };
}
const CTA_THRESHOLD_POOR = 0.7;
const CTA_THRESHOLD_EXCELLENT = 0.9;
function defaultState() {
  return {
    step: "intro",
    sessionId: null,
    seed: "",
    profile: {},
    profileAnswers: {},
    currentProfileIndex: 0,
    questionList: [],
    currentIndex: 0,
    answers: {},
    score: null
  };
}
const state = defaultState();
function startQuiz() {
  state.step = "profile";
  state.profileAnswers = {};
  state.currentProfileIndex = 0;
}
function getProfileQuestionsList() {
  return getProfileQuestions();
}
function getProfileAnswers() {
  return state.profileAnswers;
}
function getCurrentProfileIndex() {
  return state.currentProfileIndex;
}
function nextProfileStep() {
  state.currentProfileIndex++;
}
function prevProfileStep() {
  if (state.currentProfileIndex > 0) state.currentProfileIndex--;
}
function getProfileFromAnswers() {
  const profile = {};
  const questions = getProfileQuestions();
  const q1 = questions.find((q) => q.id === "q1_primary_profession");
  const q2 = questions.find((q) => q.id === "q2_registration_type");
  if (q1 && "options" in q1) {
    const v = state.profileAnswers[q1.id];
    if (v?.kind === "option") profile.profession = v.optionId;
  }
  if (q2 && "options" in q2) {
    const v = state.profileAnswers[q2.id];
    if (v?.kind === "option") profile.registrationType = v.optionId;
  }
  return profile;
}
function finishProfile() {
  state.profile = getProfileFromAnswers();
  state.questionList = buildQuizQuestionList(state.profile, state.seed, {});
  state.step = "quiz";
  state.currentIndex = 0;
  state.answers = {};
  if (state.sessionId) {
    fetch("/api/session/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: state.sessionId, profile: state.profile })
    }).catch(() => {
    });
  }
}
function getQuestionList() {
  return state.questionList;
}
function getCurrentIndex() {
  return state.currentIndex;
}
function getAnswers() {
  return state.answers;
}
function setAnswer(questionId, value, timeMs = 0) {
  state.answers = { ...state.answers, [questionId]: value };
  if (state.sessionId) {
    const q = state.questionList.find((x) => x.id === questionId);
    if (q) {
      const payload = {
        sessionId: state.sessionId,
        questionId,
        questionType: q.type,
        topic: q.topic,
        timeMs
      };
      if (value.kind === "option") {
        payload.selectedOptionId = value.optionId;
        if (q.type !== "info" && "graded" in q && q.graded && "correctOptionId" in q) {
          payload.isCorrect = value.optionId === q.correctOptionId;
        }
      } else {
        payload.textAnswer = value.text;
      }
      fetch("/api/session/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => {
      });
    }
  }
}
function hasSubmitted(questionId) {
  return questionId in state.answers;
}
function goNextQuestion() {
  if (state.currentIndex < state.questionList.length - 1) {
    state.currentIndex++;
  } else {
    state.score = computeScore(state.questionList, state.answers);
    state.step = "results";
    if (state.sessionId && state.score) {
      const topicScores = {};
      for (const t of state.score.topicScores) {
        topicScores[t.topic] = { correct: t.correct, total: t.total };
      }
      fetch("/api/session/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: state.sessionId,
          overallScore: state.score.overallRatio,
          topicScores
        })
      }).catch(() => {
      });
    }
  }
}
function goPrevQuestion() {
  if (state.currentIndex > 0) state.currentIndex--;
}
function getInfoCardAfter(questionId) {
  return getInfoAfterQuestion(questionId);
}
function getScore() {
  return state.score;
}
function retake() {
  const next = defaultState();
  next.seed = crypto.randomUUID();
  Object.assign(state, next);
}
function setSession(sessionId, seed) {
  state.sessionId = sessionId;
  state.seed = seed;
}
function getSessionId() {
  return state.sessionId;
}
function getStep() {
  return state.step;
}
const lastReviewed = "2025-06-01";
const sources = [
  { label: "NMBA CPD registration standard", url: "https://www.nursingmidwiferyboard.gov.au/Registration-Standards/Continuing-professional-development.aspx" },
  { label: "AHPRA", url: "https://www.ahpra.gov.au/" }
];
function Button($$renderer, $$props) {
  let {
    variant = "primary",
    type = "button",
    disabled = false,
    href,
    class: className = ""
  } = $$props;
  if (href) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<a${attr("href", href)}${attr_class(`btn btn-${stringify(variant)} ${stringify(className)}`, "svelte-18sv61c")}${attr("aria-disabled", disabled)}${attr("tabindex", disabled ? -1 : void 0)}><!--[-->`);
    slot($$renderer, $$props, "default", {});
    $$renderer.push(`<!--]--></a>`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<button${attr("type", type)}${attr("disabled", disabled, true)}${attr_class(`btn btn-${stringify(variant)} ${stringify(className)}`, "svelte-18sv61c")}><!--[-->`);
    slot($$renderer, $$props, "default", {});
    $$renderer.push(`<!--]--></button>`);
  }
  $$renderer.push(`<!--]-->`);
}
function Card($$renderer, $$props) {
  let { class: className = "" } = $$props;
  $$renderer.push(`<div${attr_class(`card ${stringify(className)}`, "svelte-1udyrqm")}><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></div>`);
}
function Intro($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { onStart, lastReviewed: lastReviewed2, sources: sources2 } = $$props;
    let accordionOpen = false;
    $$renderer2.push(`<main class="intro svelte-t3j3wy"><div class="intro-inner svelte-t3j3wy"><h1 class="intro-title svelte-t3j3wy">${escape_html(QUIZ_META.title)}</h1> <p class="intro-subtitle svelte-t3j3wy">Quick CPD check before the deadline</p> <div class="intro-card svelte-t3j3wy">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="intro-desc svelte-t3j3wy">A short formative quiz to check your understanding of CPD requirements. Not official advice — always confirm with AHPRA.</p> <details class="accordion svelte-t3j3wy"${attr("open", accordionOpen, true)}><summary class="svelte-t3j3wy">What this is</summary> <p>This is a knowledge check to help you prepare for the CPD year. You'll get immediate feedback and explanations. Your answers are stored anonymously for analysis.</p></details> `);
        Button($$renderer3, {
          variant: "primary",
          onclick: onStart,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Start`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <p class="intro-footer svelte-t3j3wy">Always confirm with AHPRA. Last reviewed: ${escape_html(lastReviewed2)}. <!--[-->`);
    const each_array = ensure_array_like(sources2);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let s = each_array[$$index];
      $$renderer2.push(`<a${attr("href", s.url)} target="_blank" rel="noopener noreferrer" class="svelte-t3j3wy">${escape_html(s.label)}</a>${escape_html(sources2.indexOf(s) < sources2.length - 1 ? ", " : "")}`);
    }
    $$renderer2.push(`<!--]--></p></div></main>`);
  });
}
function Progress($$renderer, $$props) {
  let { current, total, label = "" } = $$props;
  const pct = derived(() => total > 0 ? Math.min(100, current / total * 100) : 0);
  $$renderer.push(`<div class="progress-wrap svelte-pyqjfx" role="progressbar"${attr("aria-valuenow", current)}${attr("aria-valuemin", 0)}${attr("aria-valuemax", total)}${attr("aria-label", label || `Progress: ${current} of ${total}`)}>`);
  if (label) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<span class="progress-label svelte-pyqjfx">${escape_html(label)}</span>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <div class="progress-bar svelte-pyqjfx"><div class="progress-fill svelte-pyqjfx"${attr_style(`width: ${stringify(pct())}%`)}></div></div> <span class="progress-text svelte-pyqjfx">${escape_html(current)} of ${escape_html(total)}</span></div>`);
}
function RadioGroup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { name, legend, options, value, disabled = false } = $$props;
    $$renderer2.push(`<fieldset class="radio-group svelte-cw7is2"${attr("disabled", disabled, true)}><legend class="radio-legend svelte-cw7is2">${escape_html(legend)}</legend> <div class="radio-list svelte-cw7is2" role="radiogroup"${attr("aria-label", legend)}><!--[-->`);
    const each_array = ensure_array_like(options);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let opt2 = each_array[$$index];
      $$renderer2.push(`<label class="radio-option svelte-cw7is2"><input type="radio"${attr("name", name)}${attr("value", opt2.id)}${attr("checked", value === opt2.id, true)} class="radio-input svelte-cw7is2"/> <span class="radio-label svelte-cw7is2">${escape_html(opt2.label)}</span></label>`);
    }
    $$renderer2.push(`<!--]--></div></fieldset>`);
  });
}
function ProfileSetup($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      questions,
      answers,
      currentIndex,
      onNext,
      onPrev,
      onComplete,
      lastReviewed: lastReviewed2
    } = $$props;
    const currentQ = derived(() => questions[currentIndex]);
    const isLast = derived(() => currentIndex === questions.length - 1);
    const currentValue = derived(() => currentQ() && currentQ().type !== "info" && "options" in currentQ() ? answers[currentQ().id]?.kind === "option" ? answers[currentQ().id].optionId : void 0 : void 0);
    $$renderer2.push(`<main class="profile-setup svelte-wu4qxu">`);
    Progress($$renderer2, {
      current: currentIndex + 1,
      total: questions.length,
      label: "Setup"
    });
    $$renderer2.push(`<!----> `);
    if (currentQ()) {
      $$renderer2.push("<!--[-->");
      if (currentQ().type === "info") {
        $$renderer2.push("<!--[-->");
        Card($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<h2>${escape_html(currentQ().prompt)}</h2> <p class="info-body svelte-wu4qxu">${escape_html(currentQ().body)}</p> `);
            Button($$renderer3, {
              variant: "primary",
              onclick: isLast() ? onComplete : onNext,
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->${escape_html(isLast() ? "Continue to quiz" : "Continue")}`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push(`<!---->`);
          },
          $$slots: { default: true }
        });
      } else if (currentQ().type === "profile_radio" && "options" in currentQ()) {
        $$renderer2.push("<!--[1-->");
        Card($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<h2 class="question-prompt svelte-wu4qxu">${escape_html(currentQ().prompt)}</h2> `);
            if (currentQ().helperText) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<p class="helper-text svelte-wu4qxu">${escape_html(currentQ().helperText)}</p>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> `);
            RadioGroup($$renderer3, {
              name: currentQ().id,
              legend: currentQ().prompt,
              options: currentQ().options,
              value: currentValue()
            });
            $$renderer3.push(`<!----> <div class="actions svelte-wu4qxu">`);
            if (currentIndex > 0) {
              $$renderer3.push("<!--[-->");
              Button($$renderer3, {
                variant: "ghost",
                onclick: onPrev,
                children: ($$renderer4) => {
                  $$renderer4.push(`<!---->Back`);
                },
                $$slots: { default: true }
              });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> `);
            Button($$renderer3, {
              variant: "primary",
              disabled: currentValue() === void 0,
              onclick: () => isLast() ? onComplete() : onNext(),
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->${escape_html(isLast() ? "Continue to quiz" : "Next")}`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push(`<!----></div>`);
          },
          $$slots: { default: true }
        });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <p class="footer svelte-wu4qxu">Last reviewed: ${escape_html(lastReviewed2)}</p></main>`);
  });
}
function FeedbackPanel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { correct, correctAnswerLabel, explanation, exampleAnswer } = $$props;
    $$renderer2.push(`<div${attr_class(`feedback-panel feedback-${stringify(correct ? "correct" : "incorrect")}`, "svelte-p7nz7")} role="status" aria-live="polite" aria-atomic="true"><p class="feedback-result svelte-p7nz7">${escape_html(correct ? "Correct" : "Incorrect")}</p> `);
    if (!correct && correctAnswerLabel) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="feedback-correct-answer svelte-p7nz7">Correct answer: ${escape_html(correctAnswerLabel)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (explanation) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="feedback-explanation svelte-p7nz7"><!--[-->`);
      const each_array = ensure_array_like(explanation.split("\n\n"));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let para = each_array[$$index];
        $$renderer2.push(`<p class="svelte-p7nz7">${escape_html(para)}</p>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (exampleAnswer) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="feedback-example svelte-p7nz7"><strong>Example answer:</strong> <p class="svelte-p7nz7">${escape_html(exampleAnswer)}</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Quiz($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      questionList,
      currentIndex,
      answers,
      onAnswer,
      hasSubmitted: hasSubmitted2,
      onNext,
      onPrev,
      getInfoAfter
    } = $$props;
    const currentQ = derived(() => questionList[currentIndex]);
    const submitted = derived(() => currentQ() ? hasSubmitted2(currentQ().id) : false);
    const currentValue = derived(() => currentQ() && "options" in currentQ() && currentQ().type !== "text" ? answers[currentQ().id]?.kind === "option" ? answers[currentQ().id].optionId : void 0 : void 0);
    let textDraft = "";
    const textSubmitted = derived(() => currentQ()?.type === "text" && currentQ() && hasSubmitted2(currentQ().id));
    const infoCard = derived(() => currentQ() ? getInfoAfter(currentQ().id) : void 0);
    const correctOptionLabel = derived(() => {
      if (!currentQ() || currentQ().type === "info" || currentQ().type === "text") return void 0;
      const q = currentQ();
      const opt2 = q.options?.find((o) => o.id === q.correctOptionId);
      return opt2?.label;
    });
    const isCorrect = derived(() => {
      if (!currentQ() || currentQ().type !== "mcq_single" && currentQ().type !== "tf_single") return false;
      const ans = answers[currentQ().id];
      if (ans?.kind !== "option") return false;
      return ans.optionId === currentQ().correctOptionId;
    });
    $$renderer2.push(`<main class="quiz svelte-1wl3kf9">`);
    Progress($$renderer2, {
      current: currentIndex + 1,
      total: questionList.length,
      label: "Question"
    });
    $$renderer2.push(`<!----> `);
    if (currentQ()) {
      $$renderer2.push("<!--[-->");
      if (currentQ().type === "info") {
        $$renderer2.push("<!--[-->");
        Card($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<h2>${escape_html(currentQ().prompt)}</h2> <p class="info-body svelte-1wl3kf9">${escape_html(currentQ().body)}</p> `);
            Button($$renderer3, {
              variant: "primary",
              onclick: onNext,
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->Continue`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push(`<!---->`);
          },
          $$slots: { default: true }
        });
      } else if (currentQ().type === "text") {
        $$renderer2.push("<!--[1-->");
        Card($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<h2 class="question-prompt svelte-1wl3kf9">${escape_html(currentQ().prompt)}</h2> `);
            if (currentQ().helperText) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<p class="helper-text svelte-1wl3kf9">${escape_html(currentQ().helperText)}</p>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> `);
            if (!textSubmitted()) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<textarea class="text-input svelte-1wl3kf9"${attr("placeholder", currentQ().placeholder)} rows="4">`);
              const $$body = escape_html(textDraft);
              if ($$body) {
                $$renderer3.push(`${$$body}`);
              }
              $$renderer3.push(`</textarea> `);
              Button($$renderer3, {
                variant: "primary",
                onclick: () => onAnswer(currentQ().id, { kind: "text", text: textDraft }),
                children: ($$renderer4) => {
                  $$renderer4.push(`<!---->Submit`);
                },
                $$slots: { default: true }
              });
              $$renderer3.push(`<!---->`);
            } else {
              $$renderer3.push("<!--[!-->");
              if ("exampleAnswer" in currentQ() && currentQ().exampleAnswer) {
                $$renderer3.push("<!--[-->");
                FeedbackPanel($$renderer3, {
                  correct: true,
                  exampleAnswer: currentQ().exampleAnswer,
                  explanation: currentQ().explanation
                });
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]--> `);
              Button($$renderer3, {
                variant: "primary",
                onclick: onNext,
                children: ($$renderer4) => {
                  $$renderer4.push(`<!---->Continue`);
                },
                $$slots: { default: true }
              });
              $$renderer3.push(`<!---->`);
            }
            $$renderer3.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
      } else if ("options" in currentQ()) {
        $$renderer2.push("<!--[2-->");
        Card($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<h2 class="question-prompt svelte-1wl3kf9">${escape_html(currentQ().prompt)}</h2> `);
            if (currentQ().helperText) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<p class="helper-text svelte-1wl3kf9">${escape_html(currentQ().helperText)}</p>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> `);
            if (!submitted()) {
              $$renderer3.push("<!--[-->");
              RadioGroup($$renderer3, {
                name: currentQ().id,
                legend: currentQ().prompt,
                options: currentQ().options,
                value: currentValue()
              });
              $$renderer3.push(`<!----> `);
              Button($$renderer3, {
                variant: "primary",
                disabled: currentValue() === void 0,
                onclick: () => onAnswer(currentQ().id, { kind: "option", optionId: currentValue() }),
                children: ($$renderer4) => {
                  $$renderer4.push(`<!---->Submit`);
                },
                $$slots: { default: true }
              });
              $$renderer3.push(`<!---->`);
            } else {
              $$renderer3.push("<!--[!-->");
              FeedbackPanel($$renderer3, {
                correct: isCorrect(),
                correctAnswerLabel: correctOptionLabel(),
                explanation: "explanation" in currentQ() ? currentQ().explanation : void 0
              });
              $$renderer3.push(`<!----> `);
              if (infoCard()) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<div class="info-card-inline svelte-1wl3kf9"><h3 class="svelte-1wl3kf9">${escape_html(infoCard().prompt)}</h3> <p class="info-body svelte-1wl3kf9">${escape_html(infoCard().body)}</p></div>`);
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]--> <div class="actions svelte-1wl3kf9">`);
              if (currentIndex > 0) {
                $$renderer3.push("<!--[-->");
                Button($$renderer3, {
                  variant: "ghost",
                  onclick: onPrev,
                  children: ($$renderer4) => {
                    $$renderer4.push(`<!---->Back`);
                  },
                  $$slots: { default: true }
                });
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]--> `);
              Button($$renderer3, {
                variant: "primary",
                onclick: onNext,
                children: ($$renderer4) => {
                  $$renderer4.push(`<!---->Continue`);
                },
                $$slots: { default: true }
              });
              $$renderer3.push(`<!----></div>`);
            }
            $$renderer3.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
function Results($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const TOPIC_LABELS = {
      deadlines: "Deadlines",
      hours_and_proration: "Hours & pro-rata",
      context_and_relevance: "Context & relevance",
      planning_and_goals: "Planning & goals",
      evidence_and_records: "Evidence & records",
      declarations_and_audit: "Declarations & audit"
    };
    let { score, onRetake, lastReviewed: lastReviewed2, sources: sources2 } = $$props;
    const ctaCopy = derived(() => {
      if (score.overallRatio >= CTA_THRESHOLD_EXCELLENT) {
        return "You're on top of it — share this with a colleague or skim our free course for edge cases.";
      }
      if (score.overallRatio < CTA_THRESHOLD_POOR) {
        return "Want a quick refresher? Take our free CPD requirements course.";
      }
      return "You're doing well — share this with a colleague or check our free CPD course for a refresher.";
    });
    const checklistUrl = "/checklist.pdf";
    const courseUrl = "#";
    async function handleShare() {
      const url = typeof window !== "undefined" ? window.location.origin + "/" : "";
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Ausmed CPD Quiz",
            text: "Try the CPD requirements quiz",
            url
          });
        } catch {
          await copyLink(url);
        }
      } else {
        await copyLink(url);
      }
    }
    async function copyLink(url) {
      await navigator.clipboard.writeText(url);
    }
    $$renderer2.push(`<main class="results svelte-1a7e6au"><div class="results-inner svelte-1a7e6au"><h1 class="results-title svelte-1a7e6au">You're ready for CPD season</h1> <div class="score-card svelte-1a7e6au">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<h2 class="svelte-1a7e6au">Your score</h2> <p class="score-overall svelte-1a7e6au">${escape_html(score.overallCorrect)} / ${escape_html(score.overallTotal)} correct</p> `);
        if (score.topicScores.length > 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<ul class="topic-list svelte-1a7e6au"><!--[-->`);
          const each_array = ensure_array_like(score.topicScores);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let { topic, correct, total } = each_array[$$index];
            $$renderer3.push(`<li class="svelte-1a7e6au"><span class="topic-name svelte-1a7e6au">${escape_html(TOPIC_LABELS[topic] ?? topic)}</span> <span class="topic-score">${escape_html(correct)}/${escape_html(total)}</span></li>`);
          }
          $$renderer3.push(`<!--]--></ul>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="cta-card svelte-1a7e6au">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="cta-copy svelte-1a7e6au">${escape_html(ctaCopy())}</p> `);
        Button($$renderer3, {
          variant: "primary",
          href: courseUrl,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Free CPD course`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="actions svelte-1a7e6au">`);
    Button($$renderer2, {
      variant: "secondary",
      href: checklistUrl,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Download checklist (PDF)`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "ghost",
      onclick: handleShare,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Share quiz link`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "primary",
      onclick: onRetake,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Retake quiz`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <p class="footer svelte-1a7e6au">Always confirm with AHPRA. Last reviewed: ${escape_html(lastReviewed2)}. <!--[-->`);
    const each_array_1 = ensure_array_like(sources2);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let s = each_array_1[$$index_1];
      $$renderer2.push(`<a${attr("href", s.url)} target="_blank" rel="noopener noreferrer" class="svelte-1a7e6au">${escape_html(s.label)}</a>${escape_html(sources2.indexOf(s) < sources2.length - 1 ? ", " : "")}`);
    }
    $$renderer2.push(`<!--]--></p></div></main>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const step = derived(getStep);
    if (step() === "intro") {
      $$renderer2.push("<!--[-->");
      Intro($$renderer2, {
        onStart: async () => {
          const res = await fetch("/api/session/start", { method: "POST" });
          const data = await res.json();
          if (data.sessionId && data.seed) {
            setSession(data.sessionId, data.seed);
            startQuiz();
          } else {
            setSession(crypto.randomUUID(), crypto.randomUUID());
            startQuiz();
          }
        },
        lastReviewed,
        sources
      });
    } else if (step() === "profile") {
      $$renderer2.push("<!--[1-->");
      ProfileSetup($$renderer2, {
        questions: getProfileQuestionsList(),
        answers: getProfileAnswers(),
        currentIndex: getCurrentProfileIndex(),
        onNext: nextProfileStep,
        onPrev: prevProfileStep,
        onComplete: () => finishProfile(),
        lastReviewed
      });
    } else if (step() === "quiz") {
      $$renderer2.push("<!--[2-->");
      Quiz($$renderer2, {
        questionList: getQuestionList(),
        currentIndex: getCurrentIndex(),
        answers: getAnswers(),
        onAnswer: setAnswer,
        hasSubmitted,
        onNext: goNextQuestion,
        onPrev: goPrevQuestion,
        getInfoAfter: getInfoCardAfter
      });
    } else if (step() === "results") {
      $$renderer2.push("<!--[3-->");
      Results($$renderer2, {
        score: getScore(),
        sessionId: getSessionId(),
        onRetake: retake,
        lastReviewed,
        sources
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
