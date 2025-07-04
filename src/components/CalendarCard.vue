<template>
  <div class="bg-gradient-to-br from-green-100 to-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto border border-green-200">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-3xl font-bold text-green-800">{{ hijriMonthName }} {{ hijriYear }}</h2>
        <p class="text-sm text-gray-600">Kalender Hijriah + Jadwal Puasa Sunnah</p>
      </div>
      <div>
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" stroke-width="1.5"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 5.25v13.5h16.5V5.25M8.25 2.25v3M15.75 2.25v3M3.75 9.75h16.5"></path>
        </svg>
      </div>
    </div>

    <!-- Days Header -->
    <div class="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-700 mb-2">
      <div v-for="day in daysOfWeek" :key="day" class="py-1">{{ day }}</div>
    </div>

    <!-- Calendar -->
    <div class="grid grid-cols-7 gap-2">
      <div v-for="blank in blankDays" :key="'blank-' + blank"></div>

      <div
        v-for="day in daysInMonth"
        :key="day.date"
        class="p-2 h-16 flex items-center justify-center text-sm text-center rounded-lg border cursor-pointer transition-all"
        :class="{
          'bg-green-100 text-green-800 font-bold ring-2 ring-green-400': day.isToday,
          'bg-yellow-100 text-yellow-800': day.isAyyamulBidh,
          'bg-blue-100 text-blue-800': day.isSeninKamis,
          'hover:bg-green-50': !day.isToday
        }"
        :title="day.tooltip"
      >
        <div>
          <div class="font-semibold">{{ day.hijriDay }}</div>
          <div class="text-xs">{{ day.type }}</div>
        </div>
      </div>
    </div>

    <p class="mt-6 text-center text-sm text-gray-500">
      Hari ini: <span class="font-semibold text-green-700">{{ hijriToday }}</span>
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
