<script lang="ts">
  import {
    startQuiz,
    setSession,
    getStep,
    getProfileQuestionsList,
    getCurrentProfileIndex,
    getProfileAnswers,
    setProfileAnswer,
    nextProfileStep,
    prevProfileStep,
    finishProfile,
    getQuestionList,
    getCurrentIndex,
    getCurrentQuestion,
    getAnswers,
    setAnswer,
    hasSubmitted,
    goNextQuestion,
    goPrevQuestion,
    getInfoCardAfter,
    getScore,
    retake,
    getSessionId,
  } from '$lib/quiz-state.svelte';
  import { lastReviewed, sources } from '$lib/config/rules';
  import Intro from '$lib/views/Intro.svelte';
  import ProfileSetup from '$lib/views/ProfileSetup.svelte';
  import Quiz from '$lib/views/Quiz.svelte';
  import Results from '$lib/views/Results.svelte';

  const step = $derived(getStep());
  const profileAnswers = $derived(getProfileAnswers());
  const currentProfileIndex = $derived(getCurrentProfileIndex());
</script>

{#if step === 'intro'}
  <Intro
    onStart={async () => {
      const res = await fetch('/api/session/start', { method: 'POST' });
      const data = await res.json();
      if (data.sessionId && data.seed) {
        setSession(data.sessionId, data.seed);
        startQuiz();
      } else {
        setSession(crypto.randomUUID(), crypto.randomUUID());
        startQuiz();
      }
    }}
    lastReviewed={lastReviewed}
    sources={sources}
  />
{:else if step === 'profile'}
  <ProfileSetup
    questions={getProfileQuestionsList()}
    answers={profileAnswers}
    currentIndex={currentProfileIndex}
    onAnswer={setProfileAnswer}
    onNext={nextProfileStep}
    onPrev={prevProfileStep}
    onComplete={() => finishProfile()}
    lastReviewed={lastReviewed}
  />
{:else if step === 'quiz'}
  <Quiz
    questionList={getQuestionList()}
    currentIndex={getCurrentIndex()}
    answers={getAnswers()}
    onAnswer={setAnswer}
    hasSubmitted={hasSubmitted}
    onNext={goNextQuestion}
    onPrev={goPrevQuestion}
    getInfoAfter={getInfoCardAfter}
  />
{:else if step === 'results'}
  <Results
    score={getScore()!}
    sessionId={getSessionId()}
    onRetake={retake}
    lastReviewed={lastReviewed}
    sources={sources}
  />
{/if}
