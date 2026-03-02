<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Progress from '$lib/components/Progress.svelte';
  import RadioGroup from '$lib/components/RadioGroup.svelte';
  import type { Question, AnswerMap } from '$lib/questions';

  interface Props {
    questions: Question[];
    answers: AnswerMap;
    currentIndex: number;
    onAnswer: (questionId: string, value: { kind: 'option'; optionId: string }) => void;
    onNext: () => void;
    onPrev: () => void;
    onComplete: () => void;
    lastReviewed: string;
  }
  let { questions, answers, currentIndex, onAnswer, onNext, onPrev, onComplete, lastReviewed }: Props = $props();

  const currentQ = $derived(questions[currentIndex]);
  const isLast = $derived(currentIndex === questions.length - 1);

  // Local selection so the Next button enables immediately when user picks an option
  let selectedOptionId = $state<string | undefined>(undefined);
  $effect(() => {
    if (currentQ && currentQ.type !== 'info' && 'options' in currentQ) {
      const a = answers[currentQ.id];
      selectedOptionId = a?.kind === 'option' ? a.optionId : undefined;
    }
  });

  function handleChange(optionId: string) {
    selectedOptionId = optionId;
    if (currentQ && 'options' in currentQ) onAnswer(currentQ.id, { kind: 'option', optionId });
  }
</script>

<main class="profile-setup">
  <Progress
    current={currentIndex + 1}
    total={questions.length}
    label="Setup"
  />
  {#if currentQ}
    {#if currentQ.type === 'info'}
      <Card>
        <h2>{currentQ.prompt}</h2>
        <p class="info-body">{currentQ.body}</p>
        <Button variant="primary" onclick={isLast ? onComplete : onNext}>
          {isLast ? 'Continue to quiz' : 'Continue'}
        </Button>
      </Card>
    {:else if currentQ.type === 'profile_radio' && 'options' in currentQ}
      <Card>
        <h2 class="question-prompt">{currentQ.prompt}</h2>
        {#if currentQ.helperText}
          <p class="helper-text">{currentQ.helperText}</p>
        {/if}
        <RadioGroup
          name={currentQ.id}
          legend={currentQ.prompt}
          options={currentQ.options}
          value={selectedOptionId}
          onchange={(value) => handleChange(value)}
        />
        <div class="actions">
          {#if currentIndex > 0}
            <Button variant="ghost" onclick={onPrev}>Back</Button>
          {/if}
          <Button
            variant="primary"
            disabled={selectedOptionId === undefined}
            onclick={() => (isLast ? onComplete() : onNext())}
          >
            {isLast ? 'Continue to quiz' : 'Next'}
          </Button>
        </div>
      </Card>
    {/if}
  {/if}
  <p class="footer">Last reviewed: {lastReviewed}</p>
</main>

<style>
  .profile-setup {
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
    margin: 0 0 1rem 0;
  }
  .actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
    justify-content: flex-end;
  }
  .footer {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin-top: 1rem;
  }
</style>
