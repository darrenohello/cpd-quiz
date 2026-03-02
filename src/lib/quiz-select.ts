import {
  ALL_QUESTIONS,
  CORE_GRADED_QUESTION_IDS,
  SURVEY_QUESTION_IDS,
  isQuestionVisible,
  type Profile,
  type Question,
  type AnswerMap,
} from '$lib/questions';

const CORE_COUNT = 15;

/**
 * Seeded shuffle (deterministic given same seed string).
 */
function seededShuffle<T>(array: T[], seed: string): T[] {
  const arr = [...array];
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  const mul = 1103515245;
  const inc = 12345;
  let state = (h >>> 0) % 0x7fffffff;
  for (let i = arr.length - 1; i > 0; i--) {
    state = (state * mul + inc) >>> 0;
    const j = state % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getById(id: string): Question | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

/**
 * Build profile question list (fixed order: q1, q2, then info card q2b).
 */
export function getProfileQuestions(): Question[] {
  return ALL_QUESTIONS.filter((q) => q.showIn === 'profile');
}

/**
 * Build quiz question list: core graded (shuffled, up to CORE_COUNT) then survey items
 * that are visible given profile + answers. Info items with show: "after:X" are not
 * included as separate steps; render them inline after the referenced question.
 */
export function buildQuizQuestionList(
  profile: Profile,
  seed: string,
  surveyAnswers: AnswerMap = {}
): Question[] {
  const ctx = { profile, answers: surveyAnswers };

  const coreCandidates = CORE_GRADED_QUESTION_IDS.map((id) => getById(id)).filter(
    (q): q is Question => q != null
  );
  const shuffledCore = seededShuffle(coreCandidates, seed);
  const core = shuffledCore.slice(0, CORE_COUNT);

  const surveyCandidates = SURVEY_QUESTION_IDS.map((id) => getById(id)).filter(
    (q): q is Question => q != null && isQuestionVisible(q, ctx)
  );
  const survey = seededShuffle(surveyCandidates, seed + '-survey');

  return [...core, ...survey];
}

export function getInfoAfterQuestion(questionId: string): Question | undefined {
  return ALL_QUESTIONS.find(
    (q) => q.type === 'info' && q.show.startsWith('after:') && q.show === `after:${questionId}`
  );
}
