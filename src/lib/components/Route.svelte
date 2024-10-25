<script lang="ts">
  let { route } = $props();
</script>

<div class="flex flex-col justify-center p-2">
  <div class="text-xs font-medium uppercase text-gray-600">Route</div>
  <div
    class="rounded-md bg-gray-200 p-3 font-mono text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200"
  >
    {route}
  </div>
</div>
