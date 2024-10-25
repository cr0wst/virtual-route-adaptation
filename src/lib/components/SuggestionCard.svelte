<script lang="ts">
  import CriteriaPill from "$lib/components/CriteriaPill.svelte";
  import SourcePill from "$lib/components/SourcePill.svelte";
  import Route from "$lib/components/Route.svelte";

  let { suggestion } = $props();
</script>

<div
  class="rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
>
  <!-- Criteria Badges (if exists) -->
  {#if suggestion.criteria.length > 0}
    <div class="mt-2 flex flex-wrap gap-2">
      {#each suggestion.criteria as c}
        <CriteriaPill label={c.id} />
      {/each}
    </div>
  {/if}

  <!-- Route String -->
  <Route route={suggestion.route.string} />
</div>
