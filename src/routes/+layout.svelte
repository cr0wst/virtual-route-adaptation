<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <title>Virtual Route Adaptation - Indy Center</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
  <!-- Navbar -->
  <nav
    class="flex h-16 w-full items-center justify-between bg-gray-700 px-4 shadow-md dark:bg-gray-900"
  >
    <a href="/">
      <div class="text-2xl font-semibold text-white hover:text-gray-200">
        <span
          class="border-l-4 border-orange-300 bg-orange-600 p-2 font-thin text-white"
          >vRA</span
        > Indy Center
      </div>
    </a>
    <ul
      class="flex list-none flex-row space-x-2 text-white hover:text-gray-200"
    >
      <li><a href="/routes">Routes</a></li>
    </ul>
  </nav>

  <!-- Main Content Area -->
  <div class="flex-grow bg-gray-50 p-6 dark:bg-gray-800">
    {@render children()}
  </div>

  <!-- Footer -->
  <footer
    class="flex w-full flex-col items-center justify-center bg-gray-700 py-4 dark:bg-gray-900"
  >
    <span class="p-2 text-center text-sm text-gray-300 dark:text-gray-400">
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
