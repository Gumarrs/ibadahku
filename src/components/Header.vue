<template>
  <header class="bg-white shadow px-4 py-3 flex justify-between items-center">
    <h1 class="text-lg font-semibold text-green-700">Selamat datang 👋</h1>
    <div class="text-sm text-gray-600">
      {{ currentTime }}
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      currentTime: ''
    }
  },
  mounted() {
    this.updateTime()
    setInterval(this.updateTime, 1000)
  },
  methods: {
    updateTime() {
      const now = new Date()
      this.currentTime = now.toLocaleTimeString()
    }
  }
}
</script>
