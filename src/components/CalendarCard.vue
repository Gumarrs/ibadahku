<template>
  <div class="bg-gradient-to-br from-green-100 to-white dark:from-gray-900 dark:to-gray-800 p-4 rounded-lg shadow border border-green-200 dark:border-gray-700 transition-colors w-full max-w-xl mx-auto">
    
    <!-- Header -->
    <div class="mb-3 text-center">
      <h2 class="text-xl font-bold text-green-800 dark:text-green-300">
        {{ hijriMonths[selectedMonth - 1] }} {{ selectedYear }}
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-300">Kalender Hijriah + Jadwal Puasa</p>

      <!-- Dropdowns -->
      <div class="mt-3 flex justify-center gap-2 text-sm">
        <select v-model="selectedMonth" @change="generateCalendar" class="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white">
          <option v-for="(name, index) in hijriMonths" :key="index" :value="index + 1">{{ name }}</option>
        </select>
        <select v-model="selectedYear" @change="generateCalendar" class="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white">
          <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <hr class="my-3 border-t border-green-300 dark:border-green-700" />
    </div>

    <!-- Days Header -->
    <div class="grid grid-cols-7 gap-1 text-xs font-semibold text-center text-gray-700 dark:text-gray-300 mb-1">
      <div v-for="day in daysOfWeek" :key="day" class="py-1">{{ day }}</div>
    </div>

    <!-- Kalender -->
    <div class="grid grid-cols-7 gap-1 text-xs">
      <div v-for="blank in blankDays" :key="'blank-' + blank"></div>

      <div
        v-for="day in daysInMonth"
        :key="day.date"
        class="p-1 h-14 flex flex-col items-center justify-center rounded border border-green-100 dark:border-gray-700 cursor-pointer transition"
        :class="{
          'bg-green-100 text-green-800 font-bold ring-1 ring-green-400 dark:bg-green-900 dark:text-green-200 dark:ring-green-500': day.isToday,
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': day.isAyyamulBidh,
          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': day.isSeninKamis,
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': day.isRamadhan,
          'hover:bg-green-50 dark:hover:bg-green-800': !day.isToday
        }"
        :title="day.tooltip"
      >
        <div class="font-semibold">{{ day.hijriDay }}</div>
        <div class="text-[10px] leading-tight text-center">{{ day.type }}</div>
      </div>
    </div>

    <p class="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
      Hari ini: <span class="font-semibold text-green-700 dark:text-green-300">{{ hijriToday }}</span>
    </p>
  </div>
</template>

<script>
import moment from 'moment-hijri'

export default {
  name: 'HijriCalendar',
  data() {
    const today = moment()
    return {
      hijriMonths: [
        'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
        'Jumadil Ula', 'Jumadil Akhir', 'Rajab', 'Sya’ban',
        'Ramadhan', 'Syawal', 'Zulkaidah', 'Zulhijjah'
      ],
      yearOptions: Array.from({ length: 5 }, (_, i) => today.iYear() - 2 + i),
      selectedMonth: today.iMonth() + 1,
      selectedYear: today.iYear(),
      hijriToday: today.format('iD iMMMM iYYYY'),
      daysOfWeek: ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
      daysInMonth: [],
      blankDays: [],
    }
  },
  mounted() {
    this.generateCalendar()
  },
  methods: {
    generateCalendar() {
      const startHijri = moment().iYear(this.selectedYear).iMonth(this.selectedMonth - 1).startOf('iMonth')
      const endHijri = startHijri.clone().endOf('iMonth')
      const today = moment()

      const days = []
      let currentDay = startHijri.clone()

      while (currentDay.isSameOrBefore(endHijri)) {
        const hijriDate = currentDay.iDate()
        const hijriMonth = currentDay.iMonth() + 1
        const dayOfWeek = currentDay.day()
        const isSenin = dayOfWeek === 1
        const isKamis = dayOfWeek === 4
        const isAyyamulBidh = [13, 14, 15].includes(hijriDate)
        const isRamadhan = hijriMonth === 9

        let type = ''
        let tooltip = ''

        if (isRamadhan) {
          type = 'Ramadhan'
          tooltip = '🌙 Puasa Wajib Ramadhan'
        } else if (isAyyamulBidh) {
          type = 'Ayyamul Bidh'
          tooltip = '🌓 Puasa Sunnah Ayyamul Bidh'
        } else if (isSenin || isKamis) {
          type = isSenin ? 'Senin' : 'Kamis'
          tooltip = `📆 Puasa Sunnah hari ${type}`
        }

        days.push({
          date: currentDay.format('iYYYY-iMM-iDD'),
          hijriDay: hijriDate,
          isToday:
            currentDay.iDate() === today.iDate() &&
            currentDay.iMonth() === today.iMonth() &&
            currentDay.iYear() === today.iYear(),
          isSeninKamis: isSenin || isKamis,
          isAyyamulBidh,
          isRamadhan,
          type,
          tooltip
        })

        currentDay.add(1, 'day')
      }

      const firstDayOfWeek = startHijri.day()
      this.blankDays = Array(firstDayOfWeek).fill(null)
      this.daysInMonth = days
    }
  }
}
</script>
