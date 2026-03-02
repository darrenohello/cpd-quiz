<script lang="ts">
  /** 'unsure' = user selected "Not sure"; show neutral state and supportive copy */
  type ResultVariant = 'correct' | 'incorrect' | 'unsure';

  interface Props {
    correct: boolean;
    /** When true, show neutral "unsure" state instead of incorrect */
    unsure?: boolean;
    correctAnswerLabel?: string;
    explanation?: string;
    exampleAnswer?: string;
  }
  let { correct, unsure = false, correctAnswerLabel, explanation, exampleAnswer }: Props = $props();

  const variant: ResultVariant = unsure ? 'unsure' : correct ? 'correct' : 'incorrect';
  const resultCopy = variant === 'correct' ? 'Correct' : variant === 'unsure' ? "You weren't sure — here's the answer" : 'Incorrect';
</script>

<div
  class="feedback-panel feedback-{variant}"
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  <p class="feedback-result">{resultCopy}</p>
  {#if (variant === 'incorrect' || variant === 'unsure') && correctAnswerLabel}
    <p class="feedback-correct-answer">Correct answer: {correctAnswerLabel}</p>
  {/if}
  {#if explanation}
    <div class="feedback-explanation">
      {#each explanation.split('\n\n') as para}
        <p>{para}</p>
      {/each}
    </div>
  {/if}
  {#if exampleAnswer}
    <div class="feedback-example">
      <strong>Example answer:</strong>
      <p>{exampleAnswer}</p>
    </div>
  {/if}
</div>

<style>
  .feedback-panel {
    padding: 1rem;
    border-radius: var(--radius, 12px);
    margin-top: 1rem;
  }
  .feedback-correct {
    background: rgba(25, 135, 84, 0.12);
    border: 1px solid var(--color-success);
  }
  .feedback-incorrect {
    background: rgba(220, 53, 69, 0.08);
    border: 1px solid var(--color-error);
  }
  .feedback-unsure {
    background: rgba(108, 117, 125, 0.1);
    border: 1px solid #6c757d;
  }
  .feedback-result {
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }
  .feedback-correct-answer {
    margin: 0 0 0.75rem 0;
    color: var(--color-text-muted);
  }
  .feedback-explanation {
    margin: 0;
  }
  .feedback-explanation p {
    margin: 0 0 0.5rem 0;
  }
  .feedback-explanation p:last-child {
    margin-bottom: 0;
  }
  .feedback-example {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
  }
  .feedback-example p {
    margin: 0.25rem 0 0 0;
  }
</style>
