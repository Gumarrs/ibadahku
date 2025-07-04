<template>
  <div class="space-y-6">
    <!-- Welcome Banner -->
    <div class="bg-gradient-to-r from-green-100 via-white to-green-50 p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-green-700">🕌 Assalamu’alaikum!</h1>
      <p class="text-gray-600 mt-1">Selamat datang di aplikasi <strong>Ibadahku</strong>.</p>
      <p class="text-gray-700 mt-2">
        Ibadahku adalah aplikasi web yang membantu umat Muslim dalam menunaikan ibadah harian dengan lebih mudah dan interaktif.
        Mulai dari melihat <strong>jadwal sholat</strong>, menentukan <strong>arah kiblat</strong>, membaca <strong>doa-doa harian</strong>, hingga mencari <strong>masjid terdekat</strong> —
        semua tersedia dalam satu aplikasi ringan, responsif, dan mudah digunakan. 🌙
      </p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
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
