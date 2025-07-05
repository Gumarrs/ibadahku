<template>
  <div class="bg-gradient-to-br from-green-100 to-white dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto border border-green-200 dark:border-gray-700 transition-colors">
    <div  class="mb-4 text-center">
      <div>
        <h2 class="text-3xl font-bold text-green-800 dark:text-green-300">{{ hijriMonthName }} {{ hijriYear }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300">Kalender Hijriah + Jadwal Puasa Sunnah</p>
      </div>
      <hr class="my-4 border-t border-green-300 dark:border-green-700" />
      <div>

      </div>
    </div>

    <!-- Days Header -->
    <div class="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
      <div v-for="day in daysOfWeek" :key="day" class="py-1">{{ day }}</div>
    </div>

    <!-- Calendar -->
    <div class="grid grid-cols-7 gap-2">
      <div v-for="blank in blankDays" :key="'blank-' + blank"></div>

      <div
        v-for="day in daysInMonth"
        :key="day.date"
        class="p-2 h-16 flex items-center justify-center text-sm text-center rounded-lg border border-green-100 dark:border-gray-700 cursor-pointer transition-all"
        :class="{
          'bg-green-100 text-green-800 font-bold ring-2 ring-green-400 dark:bg-green-900 dark:text-green-200 dark:ring-green-500': day.isToday,
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': day.isAyyamulBidh,
          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': day.isSeninKamis,
          'hover:bg-green-50 dark:hover:bg-green-800': !day.isToday
        }"
        :title="day.tooltip"
      >
        <div>
          <div class="font-semibold">{{ day.hijriDay }}</div>
          <div class="text-xs">{{ day.type }}</div>
        </div>
      </div>
    </div>

    <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
      Hari ini: <span class="font-semibold text-green-700 dark:text-green-300">{{ hijriToday }}</span>
    </p>
  </div>
</template>


<script>
import moment from 'moment-hijri'

export default {
  data() {
    return {
      daysOfWeek: ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
      daysInMonth: [],
      blankDays: [],
      hijriMonthName: '',
      hijriYear: '',
      hijriToday: '',
    }
  },
  mounted() {
    this.generateCalendar()
  },
  methods: {
    generateCalendar() {
      const today = moment()
      const hijriTodayFormatted = today.format('iD iMMMM iYYYY')
      const startHijri = today.clone().startOf('iMonth')
      const endHijri = today.clone().endOf('iMonth')

      const days = []
      let currentDay = startHijri.clone()

      while (currentDay.isSameOrBefore(endHijri)) {
        const dayOfWeek = currentDay.day() // 0=Ahad, 1=Senin, ..., 6=Sabtu
        const hijriDate = currentDay.iDate()
        const isSenin = dayOfWeek === 1
        const isKamis = dayOfWeek === 4
        const isAyyamulBidh = [13, 14, 15].includes(hijriDate)

        let tooltip = ''
        let type = ''
        if (isAyyamulBidh) {
          tooltip = '🌓 Puasa Ayyamul Bidh – Sunnah tanggal 13-15 Hijriah. Pahala besar!'
          type = 'Ayyamul Bidh'
        } else if (isSenin || isKamis) {
          tooltip = `📆 Puasa Sunnah hari ${dayOfWeek === 1 ? 'Senin' : 'Kamis'}`
          type = dayOfWeek === 1 ? 'Senin' : 'Kamis'
        }

        days.push({
          date: currentDay.format('iYYYY-iMM-iDD'),
          hijriDay: hijriDate,
          isToday: currentDay.iDate() === today.iDate(),
          isSeninKamis: isSenin || isKamis,
          isAyyamulBidh,
          tooltip,
          type
        })
        currentDay.add(1, 'day')
      }

      const firstDayOfWeek = startHijri.day()
      this.blankDays = Array(firstDayOfWeek).fill(null)

      this.daysInMonth = days
      this.hijriMonthName = startHijri.format('iMMMM')
      this.hijriYear = startHijri.iYear()
      this.hijriToday = hijriTodayFormatted
    }
  }
}
</script>

<style scoped>
/* Optional styling */
</style>
