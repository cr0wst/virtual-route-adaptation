<script lang="ts">
  let { label } = $props<{ label: string }>();
</script>

<div
  class="rounded bg-green-700 px-2.5 py-0.5 text-xs font-medium text-gray-100 dark:bg-green-600 dark:text-gray-100"
>
  {label}
</div>
