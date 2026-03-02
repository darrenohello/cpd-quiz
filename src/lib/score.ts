import type { Question, AnswerMap, Topic } from '$lib/questions';

export type TopicScore = { topic: Topic; correct: number; total: number };
export type ScoreResult = {
  overallCorrect: number;
  overallTotal: number;
  overallRatio: number;
  topicScores: TopicScore[];
};

export function computeScore(
  questionList: Question[],
  answers: AnswerMap
): ScoreResult {
  const graded = questionList.filter(
    (q) => q.type !== 'info' && q.type !== 'text' && 'graded' in q && q.graded === true
  );
  let correct = 0;
  const byTopic = new Map<Topic, { correct: number; total: number }>();

  for (const q of graded) {
    if (q.type === 'text' || q.type === 'info') continue;
    const ans = answers[q.id];
    const selectedId = ans?.kind === 'option' ? ans.optionId : undefined;
    const isCorrect = selectedId === (q as { correctOptionId?: string }).correctOptionId;
    if (selectedId != null) {
      const total = (byTopic.get(q.topic)?.total ?? 0) + 1;
      const c = (byTopic.get(q.topic)?.correct ?? 0) + (isCorrect ? 1 : 0);
      byTopic.set(q.topic, { correct: c, total });
      if (isCorrect) correct++;
    }
  }

  const topicScores: TopicScore[] = Array.from(byTopic.entries())
    .filter(([, v]) => v.total > 0)
    .map(([topic, v]) => ({ topic, correct: v.correct, total: v.total }));

  const overallTotal = graded.length;
  return {
    overallCorrect: correct,
    overallTotal,
    overallRatio: overallTotal > 0 ? correct / overallTotal : 0,
    topicScores,
  };
}

export const CTA_THRESHOLD_POOR = 0.7;
export const CTA_THRESHOLD_EXCELLENT = 0.9;
