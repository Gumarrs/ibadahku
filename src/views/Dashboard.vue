<template>
  <div class="space-y-6">
    <!-- Welcome Banner -->
    <div class="bg-gradient-to-r from-green-100 via-white to-green-50 p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-green-700">🕌 Assalamu’alaikum!</h1>
      <p class="text-gray-600">Selamat datang di aplikasi jadwal sholat dan kalender Islam. Semoga harimu diberkahi Allah SWT.</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <PrayerTimeCard />
      <KiblatCompass />
      <TodayDateCard />
      <NearbyMosques />
    </div>
  </div>
</template>

<script setup>
import PrayerTimeCard from '@/components/PrayerTimeCard.vue'
import KiblatCompass from '@/components/KiblatCompass.vue'
import TodayDateCard from '@/components/TodayDateCard.vue'
import NearbyMosques from '@/components/NearbyMosques.vue'
</script>
