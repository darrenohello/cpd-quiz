<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost';
    type?: 'button' | 'submit';
    disabled?: boolean;
    href?: string;
    class?: string;
    onclick?: () => void;
  }
  let { variant = 'primary', type = 'button', disabled = false, href, class: className = '', onclick }: Props = $props();
</script>

{#if href}
  <a
    href={href}
    class="btn btn-{variant} {className}"
    aria-disabled={disabled}
    tabindex={disabled ? -1 : undefined}
    onclick={(e) => { if (onclick) { e.preventDefault(); onclick(); } }}
  >
    <slot />
  </a>
{:else}
  <button
    {type}
    disabled={disabled}
    class="btn btn-{variant} {className}"
    onclick={(e) => onclick?.(e)}
  >
    <slot />
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--tap-min, 44px);
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: var(--radius, 12px);
    border: none;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.15s, opacity 0.15s;
  }
  .btn:disabled,
  .btn[aria-disabled='true'] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .btn-primary {
    background: var(--color-primary);
    color: #fff;
  }
  .btn-primary:hover:not(:disabled):not([aria-disabled='true']) {
    background: var(--color-primary-hover);
  }
  .btn-secondary {
    background: var(--color-border);
    color: var(--color-text);
  }
  .btn-secondary:hover:not(:disabled):not([aria-disabled='true']) {
    background: #ccc;
  }
  .btn-ghost {
    background: transparent;
  }
  .btn-ghost:hover:not(:disabled):not([aria-disabled='true']) {
    background: rgba(0, 0, 0, 0.06);
  }
</style>
