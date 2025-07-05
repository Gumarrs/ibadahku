<template>
  <footer class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center py-4 text-sm text-gray-600 dark:text-gray-300 transition-colors">
    &copy; {{ year }} Copyright | 
    <strong class="text-green-700 dark:text-green-400">Agus Marsadualan</strong>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
