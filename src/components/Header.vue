<template>
  <header class="bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center transition-colors">
    <h1 class="text-lg font-semibold text-green-700 dark:text-green-300">Selamat datang 👋</h1>
    
    <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
      <span>{{ currentTime }}</span>

      <!-- Toggle Dark Mode -->
      <button @click="toggleDarkMode" class="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        <span v-if="isDark">🌙</span>
        <span v-else>🌞</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      currentTime: '',
      isDark: false
    }
  },
  mounted() {
    this.updateTime()
    setInterval(this.updateTime, 1000)
    this.initTheme()
  },
  methods: {
    updateTime() {
      const now = new Date()
      this.currentTime = now.toLocaleTimeString()
    },
    toggleDarkMode() {
      const html = document.documentElement
      html.classList.toggle('dark')
      this.isDark = html.classList.contains('dark')
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    initTheme() {
      const saved = localStorage.getItem('theme')
      const html = document.documentElement
      if (saved === 'dark') {
        html.classList.add('dark')
        this.isDark = true
      }
    }
  }
}
</script>

<style scoped>
/* Smooth transition */
header {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
