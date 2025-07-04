<template>
  <div class="bg-gradient-to-br from-green-100 to-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto border border-green-200">
    <div class="flex items-center justify-between mb-4">
      <div class="text-left">
        <h2 class="text-3xl font-bold text-green-800">{{ hijriMonthName }} {{ hijriYear }}</h2>
        <p class="text-sm text-gray-600">Kalender Hijriah</p>
      </div>
      <div>
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" stroke-width="1.5"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 5.25v13.5h16.5V5.25M8.25 2.25v3M15.75 2.25v3M3.75 9.75h16.5"></path>
        </svg>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-700 mb-2">
      <div v-for="day in daysOfWeek" :key="day" class="py-1">{{ day }}</div>
    </div>

    <div class="grid grid-cols-7 gap-2">
      <div v-for="blank in blankDays" :key="'blank-' + blank"></div>

      <div
        v-for="day in daysInMonth"
        :key="day.date"
        class="p-2 h-14 flex items-center justify-center rounded-lg border border-gray-200 cursor-pointer transition-all"
        :class="{
          'bg-green-100 text-green-800 font-bold shadow-inner ring-2 ring-green-400': day.isToday,
          'hover:bg-green-50': !day.isToday
        }"
        :title="'Tanggal: ' + day.hijriDay"
      >
        {{ day.hijriDay }}
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
      const hijriTodayFormatted = today.format('iD iMMMM iYYYY') // eg: 9 Muharram 1447
      const startHijri = today.clone().startOf('iMonth')
      const endHijri = today.clone().endOf('iMonth')

      const days = []
      let currentDay = startHijri.clone()

      while (currentDay.isSameOrBefore(endHijri)) {
        days.push({
          date: currentDay.format('iYYYY-iMM-iDD'),
          hijriDay: currentDay.iDate(),
          isToday: currentDay.iDate() === today.iDate(),
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
/* Tambahan animasi atau efek opsional */
</style>
