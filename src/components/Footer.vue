<template>
  <footer class="bg-gray-50 border-t border-gray-200 text-center py-4 text-sm text-gray-600">
    &copy; {{ year }} Copyright | <strong class="text-green-700">Agus Marsadualan</strong>
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
