<script lang="ts">
  interface Props {
    current: number;
    total: number;
    label?: string;
  }
  let { current, total, label = '' }: Props = $props();
  const pct = $derived(total > 0 ? Math.min(100, (current / total) * 100) : 0);
</script>

<div class="progress-wrap" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label={label || `Progress: ${current} of ${total}`}>
  {#if label}
    <span class="progress-label">{label}</span>
  {/if}
  <div class="progress-bar">
    <div class="progress-fill" style="width: {pct}%"></div>
  </div>
  <span class="progress-text">{current} of {total}</span>
</div>

<style>
  .progress-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1rem;
  }
  .progress-label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    width: 100%;
  }
  .progress-bar {
    flex: 1;
    min-width: 0;
    height: 8px;
    background: var(--color-border);
    border-radius: 4px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: 4px;
    transition: width 0.2s ease;
  }
  .progress-text {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
