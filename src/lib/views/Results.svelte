<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import { CTA_THRESHOLD_POOR, CTA_THRESHOLD_EXCELLENT } from '$lib/score';
  import type { ScoreResult } from '$lib/score';

  const TOPIC_LABELS: Record<string, string> = {
    deadlines: 'Deadlines',
    hours_and_proration: 'Hours & pro-rata',
    context_and_relevance: 'Context & relevance',
    planning_and_goals: 'Planning & goals',
    evidence_and_records: 'Evidence & records',
    declarations_and_audit: 'Declarations & audit',
  };

  interface Props {
    score: ScoreResult;
    sessionId: string | null;
    onRetake: () => void;
    lastReviewed: string;
    sources: { label: string; url: string }[];
  }
  let { score, sessionId, onRetake, lastReviewed, sources }: Props = $props();

  const ctaCopy = $derived.by(() => {
    if (score.overallRatio >= CTA_THRESHOLD_EXCELLENT) {
      return "You're on top of it — share this with a colleague or skim our free course for edge cases.";
    }
    if (score.overallRatio < CTA_THRESHOLD_POOR) {
      return 'Want a quick refresher? Take our free CPD requirements course.';
    }
    return "You're doing well — share this with a colleague or check our free CPD course for a refresher.";
  });

  const checklistUrl = '/checklist.pdf';
  const courseUrl = '#';

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.origin + '/' : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ausmed CPD Quiz',
          text: 'Try the CPD requirements quiz',
          url,
        });
      } catch {
        await copyLink(url);
      }
    } else {
      await copyLink(url);
    }
  }

  async function copyLink(url: string) {
    await navigator.clipboard.writeText(url);
  }
</script>

<main class="results">
  <div class="results-inner">
    <h1 class="results-title">You're ready for CPD season</h1>
    <div class="score-card"><Card>
      <h2>Your score</h2>
      <p class="score-overall">{score.overallCorrect} / {score.overallTotal} correct</p>
      {#if score.topicScores.length > 0}
        <ul class="topic-list">
          {#each score.topicScores as { topic, correct, total }}
            <li>
              <span class="topic-name">{TOPIC_LABELS[topic] ?? topic}</span>
              <span class="topic-score">{correct}/{total}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </Card></div>
    <div class="cta-card"><Card>
      <p class="cta-copy">{ctaCopy}</p>
      <Button variant="primary" href={courseUrl}>Free CPD course</Button>
    </Card></div>
    <div class="actions">
      <Button variant="secondary" href={checklistUrl}>Download checklist (PDF)</Button>
      <Button variant="ghost" onclick={handleShare}>Share quiz link</Button>
      <Button variant="primary" onclick={onRetake}>Retake quiz</Button>
    </div>
    <p class="footer">
      Always confirm with AHPRA. Last reviewed: {lastReviewed}.
      {#each sources as s}
        <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>{sources.indexOf(s) < sources.length - 1 ? ', ' : ''}
      {/each}
    </p>
  </div>
</main>

<style>
  .results {
    min-height: 100vh;
    padding: var(--space);
  }
  .results-inner {
    max-width: 480px;
    margin: 0 auto;
  }
  .results-title {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
  }
  .score-card {
    margin-bottom: 1rem;
  }
  .score-card h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
  }
  .score-overall {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
  }
  .topic-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .topic-list li {
    display: flex;
    justify-content: space-between;
    padding: 0.25rem 0;
  }
  .topic-name {
    color: var(--color-text-muted);
  }
  .cta-card {
    margin-bottom: 1rem;
  }
  .cta-copy {
    margin: 0 0 1rem 0;
  }
  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .footer {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  .footer a {
    color: var(--color-primary);
  }
</style>
