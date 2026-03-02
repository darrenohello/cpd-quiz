<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Progress from '$lib/components/Progress.svelte';
  import RadioGroup from '$lib/components/RadioGroup.svelte';
  import FeedbackPanel from '$lib/components/FeedbackPanel.svelte';
  import type { Question, AnswerMap } from '$lib/questions';

  interface Props {
    questionList: Question[];
    currentIndex: number;
    answers: AnswerMap;
    onAnswer: (questionId: string, value: { kind: 'option'; optionId: string } | { kind: 'text'; text: string }) => void;
    hasSubmitted: (questionId: string) => boolean;
    onNext: () => void;
    onPrev: () => void;
    getInfoAfter: (questionId: string) => Question | undefined;
  }
  let {
    questionList,
    currentIndex,
    answers,
    onAnswer,
    hasSubmitted,
    onNext,
    onPrev,
    getInfoAfter,
  }: Props = $props();

  const currentQ = $derived(questionList[currentIndex]);
  const submitted = $derived(currentQ ? hasSubmitted(currentQ.id) : false);

  // Local selection for MCQ/tf: only committed to answers when user clicks Submit
  let selectedOptionId = $state<string | undefined>(undefined);
  $effect(() => {
    if (currentQ && 'options' in currentQ && currentQ.type !== 'text') {
      const existing = answers[currentQ.id]?.kind === 'option' ? answers[currentQ.id].optionId : undefined;
      selectedOptionId = existing;
    }
  });

  let textDraft = $state('');
  $effect(() => {
    if (currentQ?.type === 'text') {
      const existing = answers[currentQ.id]?.kind === 'text' ? answers[currentQ.id].text : '';
      textDraft = existing;
    }
  });
  const textSubmitted = $derived(currentQ?.type === 'text' && currentQ && hasSubmitted(currentQ.id));
  const infoCard = $derived(currentQ ? getInfoAfter(currentQ.id) : undefined);
  const isGraded = $derived(
    currentQ && currentQ.type !== 'info' && currentQ.type !== 'text' && 'graded' in currentQ && currentQ.graded
  );
  const correctOptionLabel = $derived.by(() => {
    if (!currentQ || currentQ.type === 'info' || currentQ.type === 'text') return undefined;
    const q = currentQ as { options: { id: string; label: string }[]; correctOptionId?: string };
    const opt = q.options?.find((o) => o.id === q.correctOptionId);
    return opt?.label;
  });
  const isCorrect = $derived.by(() => {
    if (!currentQ || currentQ.type !== 'mcq_single' && currentQ.type !== 'tf_single') return false;
    const ans = answers[currentQ.id];
    if (ans?.kind !== 'option') return false;
    return ans.optionId === (currentQ as { correctOptionId?: string }).correctOptionId;
  });
  /** True when user submitted "Not sure" — show neutral feedback instead of "Incorrect" */
  const submittedNotSure = $derived.by(() => {
    if (!currentQ || !('options' in currentQ)) return false;
    const ans = answers[currentQ.id];
    if (ans?.kind !== 'option') return false;
    const opt = (currentQ as { options: { id: string; label: string }[] }).options.find((o) => o.id === ans.optionId);
    return opt ? /not\s*sure/i.test(opt.label) : (ans.optionId === 'NotSure' || ans.optionId === 'E');
  });
</script>

<main class="quiz">
  <Progress
    current={currentIndex + 1}
    total={questionList.length}
    label="Question"
  />
  {#if currentQ}
    {#if currentQ.type === 'info'}
      <Card>
        <h2>{currentQ.prompt}</h2>
        <p class="info-body">{currentQ.body}</p>
        <Button variant="primary" onclick={onNext}>Continue</Button>
      </Card>
    {:else if currentQ.type === 'text'}
      <Card>
        <h2 class="question-prompt">{currentQ.prompt}</h2>
        {#if currentQ.helperText}
          <p class="helper-text">{currentQ.helperText}</p>
        {/if}
        {#if !textSubmitted}
          <textarea
            class="text-input"
            placeholder={currentQ.placeholder}
            bind:value={textDraft}
            rows="4"
          ></textarea>
          <Button variant="primary" onclick={() => onAnswer(currentQ.id, { kind: 'text', text: textDraft })}>Submit</Button>
        {:else}
          {#if 'exampleAnswer' in currentQ && currentQ.exampleAnswer}
            <FeedbackPanel
              correct={true}
              exampleAnswer={currentQ.exampleAnswer}
              explanation={currentQ.explanation}
            />
          {/if}
          <Button variant="primary" onclick={onNext}>Continue</Button>
        {/if}
      </Card>
    {:else if 'options' in currentQ}
      <Card>
        <h2 class="question-prompt">{currentQ.prompt}</h2>
        {#if currentQ.helperText}
          <p class="helper-text">{currentQ.helperText}</p>
        {/if}
        {#if !submitted}
          <RadioGroup
            name={currentQ.id}
            legend={currentQ.prompt}
            options={currentQ.options}
            value={selectedOptionId}
            onchange={(value) => (selectedOptionId = value)}
          />
          <Button
            variant="primary"
            disabled={selectedOptionId === undefined}
            onclick={() => onAnswer(currentQ.id, { kind: 'option', optionId: selectedOptionId! })}
          >
            Submit
          </Button>
        {:else}
          <FeedbackPanel
            correct={isCorrect}
            unsure={submittedNotSure}
            correctAnswerLabel={correctOptionLabel}
            explanation={'explanation' in currentQ ? currentQ.explanation : undefined}
          />
          {#if infoCard}
            <div class="info-card-inline">
              <h3>{infoCard.prompt}</h3>
              <p class="info-body">{infoCard.body}</p>
            </div>
          {/if}
          <div class="actions">
            {#if currentIndex > 0}
              <Button variant="ghost" onclick={onPrev}>Back</Button>
            {/if}
            <Button variant="primary" onclick={onNext}>Continue</Button>
          </div>
        {/if}
      </Card>
    {/if}
  {/if}
</main>

<style>
  .quiz {
    max-width: 50rem;
    margin: 0 auto;
    padding: var(--space);
  }
  .question-prompt {
    margin: 0 0 0.5rem 0;
  }
  .helper-text {
    color: var(--color-text-muted);
    font-size: 0.9375rem;
    margin: 0 0 1rem 0;
  }
  .info-body {
    white-space: pre-line;
  }
  .text-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--color-border);
    border-radius: var(--radius);
    font-family: inherit;
    font-size: 1rem;
    margin-bottom: 1rem;
    resize: vertical;
  }
  .info-card-inline {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(13, 110, 253, 0.06);
    border-radius: var(--radius);
  }
  .info-card-inline h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }
  .actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
    justify-content: flex-end;
  }
</style>
