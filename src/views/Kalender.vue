<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <CalendarCard />
  </div>
</template>

<script>
import CalendarCard from '@/components/CalendarCard.vue'

export default {
  name: 'KalenderView',
  components: {
    CalendarCard
  }
}
</script>
