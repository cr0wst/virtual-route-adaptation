<script lang="ts">
  let { remarks } = $props();

  // Define a function to highlight important route parts
  function highlightRemarks(remarks: string): string {
    // Regex to match any 3 uppercase letters followed by a forward slash
    const regex = /\b([A-Z]{3}\/)\b/g;

    // Replace the matching parts with a span that uses Tailwind's font-bold
    return remarks.replace(regex, '<span class="font-bold">$1</span>');
  }
</script>

<div class="flex flex-col justify-center p-2">
  <div class="text-sm font-semibold text-gray-600">Remarks</div>
  <div
    class="rounded-md bg-gray-200 p-3 font-mono text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200"
  >
    {@html highlightRemarks(remarks)}
  </div>
</div>
