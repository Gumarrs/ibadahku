<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-green-700 mb-4">Jadwal Sholat 7 Hari ke Depan</h1>
    <table class="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead class="bg-green-600 text-white">
        <tr>
          <th class="text-left py-2 px-4">Tanggal</th>
          <th class="text-left py-2 px-4">Imsak</th>
          <th class="text-left py-2 px-4">Subuh</th>
          <th class="text-left py-2 px-4">Dzuhur</th>
          <th class="text-left py-2 px-4">Ashar</th>
          <th class="text-left py-2 px-4">Maghrib</th>
          <th class="text-left py-2 px-4">Isya</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(day, index) in schedule" :key="index" class="border-b hover:bg-gray-50">
          <td class="py-2 px-4">{{ day.date.readable }}</td>
          <td class="py-2 px-4">{{ day.timings.Imsak }}</td>
          <td class="py-2 px-4">{{ day.timings.Fajr }}</td>
          <td class="py-2 px-4">{{ day.timings.Dhuhr }}</td>
          <td class="py-2 px-4">{{ day.timings.Asr }}</td>
          <td class="py-2 px-4">{{ day.timings.Maghrib }}</td>
          <td class="py-2 px-4">{{ day.timings.Isha }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schedule: [],
    }
  },
  async mounted() {
    try {
      const response = await fetch(
        'https://api.aladhan.com/v1/calendarByCity?city=Yogyakarta&country=Indonesia&method=2&month=7&year=2025'
      )
      const data = await response.json()
      this.schedule = data.data.slice(0, 7) // ambil 7 hari pertama
    } catch (error) {
      console.error('Gagal mengambil jadwal:', error)
    }
  },
}
</script>
