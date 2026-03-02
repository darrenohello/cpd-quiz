<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import { QUIZ_META } from '$lib/questions';

  interface Props {
    onStart: () => void;
    lastReviewed: string;
    sources: { label: string; url: string }[];
  }
  let { onStart, lastReviewed, sources }: Props = $props();

  let accordionOpen = $state(false);
</script>

<main class="intro">
  <div class="intro-inner">
    <h1 class="intro-title">{QUIZ_META.title}</h1>
    <p class="intro-subtitle">Quick CPD check before the deadline</p>
    <div class="intro-card"><Card>
      <p class="intro-desc">
        A short formative quiz to check your understanding of CPD requirements. Not official advice — always confirm with AHPRA.
      </p>
      <details class="accordion" open={accordionOpen} ontoggle={(e) => (accordionOpen = (e.target as HTMLDetailsElement).open)}>
        <summary>What this is</summary>
        <p>
          This is a knowledge check to help you prepare for the CPD year. You'll get immediate feedback and explanations. Your answers are stored anonymously for analysis.
        </p>
      </details>
      <Button variant="primary" onclick={onStart}>Start</Button>
    </Card></div>
    <p class="intro-footer">
      Always confirm with AHPRA. Last reviewed: {lastReviewed}.
      {#each sources as s}
        <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>{sources.indexOf(s) < sources.length - 1 ? ', ' : ''}
      {/each}
    </p>
  </div>
</main>

<style>
  .intro {
    min-height: 100vh;
    padding: var(--space);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .intro-inner {
    max-width: 50rem;
    width: 100%;
  }
  .intro-title {
    font-size: 1.75rem;
    margin: 0 0 0.25rem 0;
  }
  .intro-subtitle {
    color: var(--color-text-muted);
    margin: 0 0 1.5rem 0;
  }
  .intro-card {
    margin-bottom: 1rem;
  }
  .intro-desc {
    margin: 0 0 1rem 0;
  }
  .accordion {
    margin-bottom: 1rem;
  }
  .accordion summary {
    cursor: pointer;
    font-weight: 600;
  }
  .intro-footer {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  .intro-footer a {
    color: var(--color-primary);
  }
</style>
