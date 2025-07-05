<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition-colors duration-300">
    <!-- Judul Doa -->
    <h2 class="text-lg font-bold text-green-700 dark:text-green-400">{{ item.judul }}</h2>

    <!-- Teks Arab -->
    <div class="text-right text-2xl leading-relaxed text-gray-900 dark:text-gray-200 font-arabic select-text my-3">
      {{ item.arab }}
    </div>

    <!-- Latin & Arti -->
    <div v-if="expanded" class="space-y-1">
      <p class="text-sm italic text-gray-600 dark:text-gray-300">{{ item.latin }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-300">"{{ item.arti }}"</p>
    </div>

    <!-- Tombol Aksi -->
    <div class="mt-3 flex justify-between items-center text-sm">
      <button @click="toggleExpand" class="text-green-600 hover:underline focus:outline-none">
        {{ expanded ? 'Sembunyikan Arti' : 'Tampilkan Arti & Latin' }}
      </button>
      <button @click="copyDoa" class="text-gray-500 dark:text-gray-300 hover:text-green-600 focus:outline-none">
        📋 Salin
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ item: Object })
const expanded = ref(false)

const toggleExpand = () => {
  expanded.value = !expanded.value
}

const copyDoa = () => {
  const text = `${props.item.judul}\n${props.item.arab}\n${props.item.latin}\n"${props.item.arti}"`
  navigator.clipboard.writeText(text)
  alert('✅ Teks doa telah disalin.')
}
</script>

<style scoped>
.font-arabic {
  font-family: 'Scheherazade New', 'Amiri', 'Noto Naskh Arabic', serif;
  direction: rtl;
}
</style>
