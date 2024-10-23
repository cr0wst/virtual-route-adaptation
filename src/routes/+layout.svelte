<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <title>Virtual Route Adaptation</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
  <!-- Navbar -->
  <nav
    class="flex h-16 w-full items-center justify-between bg-gray-700 px-4 shadow-md dark:bg-gray-900"
  >
    <h1 class="text-2xl font-light text-white">Virtual Route Adaptation</h1>
    <ul class="flex list-none flex-row space-x-2 text-white">
      <li><a href="/">Home</a></li>
      <li><a href="/routes">Routes</a></li>
    </ul>
  </nav>

  <!-- Main Content Area -->
  <div class="flex-grow bg-gray-50 p-6 dark:bg-gray-800">
    {@render children()}
  </div>

  <!-- Footer -->
  <footer
    class="flex w-full items-center justify-center bg-gray-700 py-4 dark:bg-gray-900"
  >
    <span class="text-sm text-gray-300 dark:text-gray-400">
      This site is not affiliated with the Federal Aviation Administration or
      any governing aviation body. All content is approved only for use on the
      VATSIM network.
    </span>
  </footer>
</div>

<style>
  :global(body) {
    @apply bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200;
  }
</style>
