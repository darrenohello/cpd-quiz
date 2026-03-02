<script lang="ts">
  import type { Option } from '$lib/questions';

  interface Props {
    name: string;
    legend: string;
    options: Option[];
    value: string | undefined;
    disabled?: boolean;
    /** Callback when selection changes. In Svelte 5, use this instead of on:change. */
    onchange?: (value: string) => void;
  }
  let { name, legend, options, value, disabled = false, onchange }: Props = $props();

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.checked) onchange?.(target.value);
  }
</script>

<fieldset class="radio-group" disabled={disabled}>
  <legend class="radio-legend">{legend}</legend>
  <div class="radio-list" role="radiogroup" aria-label={legend}>
    {#each options as opt}
      <label class="radio-option">
        <input
          type="radio"
          name={name}
          value={opt.id}
          checked={value === opt.id}
          onchange={handleChange}
          class="radio-input"
        />
        <span class="radio-label">{opt.label}</span>
      </label>
    {/each}
  </div>
</fieldset>

<style>
  .radio-group {
    border: none;
    margin: 0;
    padding: 0;
  }
  .radio-legend {
    font-weight: 600;
    margin-bottom: 0.5rem;
    padding: 0;
  }
  .radio-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .radio-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-height: var(--tap-min, 44px);
    padding: 0.5rem 0.75rem;
    border: 2px solid var(--color-border);
    border-radius: var(--radius, 12px);
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  .radio-option:hover {
    border-color: var(--color-primary);
    background: rgba(13, 110, 253, 0.04);
  }
  .radio-option:has(.radio-input:checked) {
    border-color: var(--color-primary);
    background: rgba(13, 110, 253, 0.08);
  }
  .radio-input {
    width: 1.25rem;
    height: 1.25rem;
    margin: 0;
    flex-shrink: 0;
  }
  .radio-label {
    flex: 1;
  }
</style>
