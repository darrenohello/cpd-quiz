import {
  getProfileQuestions,
  buildQuizQuestionList,
  getInfoAfterQuestion,
} from '$lib/quiz-select';
import { computeScore } from '$lib/score';
import type { Profile, Question, AnswerMap } from '$lib/questions';
import type { ScoreResult } from '$lib/score';

export type Step = 'intro' | 'profile' | 'quiz' | 'results';

export type QuizState = {
  step: Step;
  sessionId: string | null;
  seed: string;
  profile: Profile;
  profileAnswers: AnswerMap;
  currentProfileIndex: number;
  questionList: Question[];
  currentIndex: number;
  answers: AnswerMap;
  score: ScoreResult | null;
};

function defaultState(): QuizState {
  return {
    step: 'intro',
    sessionId: null,
    seed: '',
    profile: {},
    profileAnswers: {},
    currentProfileIndex: 0,
    questionList: [],
    currentIndex: 0,
    answers: {},
    score: null,
  };
}

const state = $state<QuizState>(defaultState());

export function getState() {
  return state;
}

export function startQuiz() {
  state.step = 'profile';
  state.profileAnswers = {};
  state.currentProfileIndex = 0;
}

export function getProfileQuestionsList() {
  return getProfileQuestions();
}

export function getProfileAnswers(): AnswerMap {
  return state.profileAnswers;
}

export function setProfileAnswer(questionId: string, value: { kind: 'option'; optionId: string }) {
  state.profileAnswers = { ...state.profileAnswers, [questionId]: value };
}

export function getCurrentProfileIndex() {
  return state.currentProfileIndex;
}

export function nextProfileStep() {
  state.currentProfileIndex++;
}

export function prevProfileStep() {
  if (state.currentProfileIndex > 0) state.currentProfileIndex--;
}

export function getProfileFromAnswers(): Profile {
  const profile: Profile = {};
  const questions = getProfileQuestions();
  const q1 = questions.find((q) => q.id === 'q1_primary_profession');
  const q2 = questions.find((q) => q.id === 'q2_registration_type');
  if (q1 && 'options' in q1) {
    const v = state.profileAnswers[q1.id];
    if (v?.kind === 'option') profile.profession = v.optionId as Profile['profession'];
  }
  if (q2 && 'options' in q2) {
    const v = state.profileAnswers[q2.id];
    if (v?.kind === 'option') profile.registrationType = v.optionId as Profile['registrationType'];
  }
  return profile;
}

export function finishProfile() {
  state.profile = getProfileFromAnswers();
  state.questionList = buildQuizQuestionList(state.profile, state.seed, {});
  state.step = 'quiz';
  state.currentIndex = 0;
  state.answers = {};
  if (state.sessionId) {
    fetch('/api/session/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: state.sessionId, profile: state.profile }),
    }).catch(() => {});
  }
}

export function getQuestionList(): Question[] {
  return state.questionList;
}

export function getCurrentIndex() {
  return state.currentIndex;
}

export function getAnswers(): AnswerMap {
  return state.answers;
}

export function setAnswer(
  questionId: string,
  value: { kind: 'option'; optionId: string } | { kind: 'text'; text: string },
  timeMs = 0
) {
  state.answers = { ...state.answers, [questionId]: value };
  if (state.sessionId) {
    const q = state.questionList.find((x) => x.id === questionId);
    if (q) {
      const payload: Record<string, unknown> = {
        sessionId: state.sessionId,
        questionId,
        questionType: q.type,
        topic: q.topic,
        timeMs,
      };
      if (value.kind === 'option') {
        payload.selectedOptionId = value.optionId;
        if (q.type !== 'info' && 'graded' in q && q.graded && 'correctOptionId' in q) {
          payload.isCorrect = value.optionId === q.correctOptionId;
        }
      } else {
        payload.textAnswer = value.text;
      }
      fetch('/api/session/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }
  }
}

export function getCurrentQuestion(): Question | undefined {
  return state.questionList[state.currentIndex];
}

export function hasSubmitted(questionId: string): boolean {
  return questionId in state.answers;
}

export function goNextQuestion() {
  if (state.currentIndex < state.questionList.length - 1) {
    state.currentIndex++;
  } else {
    state.score = computeScore(state.questionList, state.answers);
    state.step = 'results';
    if (state.sessionId && state.score) {
      const topicScores: Record<string, { correct: number; total: number }> = {};
      for (const t of state.score.topicScores) {
        topicScores[t.topic] = { correct: t.correct, total: t.total };
      }
      fetch('/api/session/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: state.sessionId,
          overallScore: state.score.overallRatio,
          topicScores,
        }),
      }).catch(() => {});
    }
  }
}

export function goPrevQuestion() {
  if (state.currentIndex > 0) state.currentIndex--;
}

export function getInfoCardAfter(questionId: string): Question | undefined {
  return getInfoAfterQuestion(questionId);
}

export function getScore(): ScoreResult | null {
  return state.score;
}

export function retake() {
  const next = defaultState();
  next.seed = crypto.randomUUID();
  Object.assign(state, next);
}

export function setSession(sessionId: string, seed: string) {
  state.sessionId = sessionId;
  state.seed = seed;
}

export function getSessionId() {
  return state.sessionId;
}

export function getSeed() {
  return state.seed;
}

export function getStep() {
  return state.step;
}

export function setStep(s: Step) {
  state.step = s;
}
