<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
      Jadwal Sholat Bulan Ini
    </h1>

    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead class="bg-green-600 text-white dark:bg-green-700">
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
          <tr
            v-for="(day, index) in schedule"
            :key="index"
            class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <td class="py-2 px-4 text-gray-800 dark:text-gray-200">
              {{ day.date.readable }}
            </td>
            <td class="py-2 px-4 text-gray-800 dark:text-gray-200">
              {{ day.timings.Imsak }}
            </td>
            <td class="py-2 px-4 text-gray-800 dark:text-gray-200">
              {{ day.timings.Fajr }}
            </td>
            <td class="py-2 px-4 text-gray-800 dark:text-gray-200">
              {{ day.timings.Dhuhr }}
            </td>
            <td class="py-2 px-4 text-gray-800 dark:text-gray-200">
              {{ day.timings.Asr }}
            </td>
            <td class="py-2 px-4 text-gray-800 dark:text-gray-200">
              {{ day.timings.Maghrib }}
            </td>
            <td class="py-2 px-4 text-gray-800 dark:text-gray-200">
              {{ day.timings.Isha }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JadwalSholatBulanIni',
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
      this.schedule = data.data.slice(0, 30)
    } catch (error) {
      console.error('Gagal mengambil jadwal:', error)
    }
  },
}
</script>
