<!-- File: src/components/PrayerTimeCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow p-4 text-center">
    <h2 class="text-xl font-semibold text-green-700 mb-1">🕌 Waktu Sholat</h2>
    <p class="text-gray-600 text-sm mb-3">Kota: Yogyakarta, Indonesia</p>

    <div class="grid grid-cols-1 gap-3 text-left">
      <div
        v-for="(time, name) in prayerTimes"
        :key="name"
        class="flex justify-between bg-gray-50 rounded-md px-3 py-2 shadow-sm"
      >
        <span class="text-gray-700 font-medium">{{ name }}</span>
        <span class="text-green-700 font-semibold">{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const prayerTimes = ref({})

onMounted(async () => {
  try {
    const res = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
      params: {
        city: 'Yogyakarta',
        country: 'Indonesia',
        method: 2
      }
    })

    const timings = res.data.data.timings
    prayerTimes.value = {
      Subuh: timings.Fajr,
      Dzuhur: timings.Dhuhr,
      Ashar: timings.Asr,
      Maghrib: timings.Maghrib,
      Isya: timings.Isha
    }
  } catch (error) {
    console.error('Gagal mengambil data waktu sholat:', error)
  }
})
</script>
