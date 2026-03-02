<script lang="ts">
  let { class: className = '' } = $props();
</script>

<div class="card {className}">
  <slot />
</div>

<style>
  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius, 12px);
    padding: var(--space, 1rem);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  }
</style>
