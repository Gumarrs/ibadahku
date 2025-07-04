<template>
  <div class="bg-white rounded-lg shadow p-4 text-center">
    <h2 class="text-xl font-bold text-green-700 mb-2">📅 Hari Ini</h2>

    <div v-if="loading" class="text-gray-500">Memuat tanggal...</div>
    <div v-else>
      <p class="text-lg font-semibold text-gray-800">{{ today.gregorian.full }}</p>
      <p class="text-sm text-gray-600 italic">{{ today.hijri.full }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const today = ref({
  gregorian: {
    full: ''
  },
  hijri: {
    full: ''
  }
})

const loading = ref(true)

onMounted(async () => {
  try {
    const todayDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-')
    const res = await axios.get('https://api.aladhan.com/v1/gToH', {
      params: { date: todayDate }
    })

    const g = res.data.data.gregorian
    const h = res.data.data.hijri

    today.value = {
      gregorian: {
        full: `${g.weekday.en}, ${g.day} ${g.month.en} ${g.year}` // Contoh: Friday, 04 July 2025
      },
      hijri: {
        full: `${h.weekday.ar} / ${h.day} ${h.month.ar} ${h.year} هـ` // Contoh: الجمعة / 27 ذو الحجة 1446 هـ
      }
    }
  } catch (e) {
    console.error('Gagal mengambil tanggal:', e)
  } finally {
    loading.value = false
  }
})
</script>
