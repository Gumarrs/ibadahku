<!-- File: src/components/DoaDzikir.vue -->
<template>
  <div class="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
    <h2 class="text-lg font-bold text-green-700">{{ item.judul }}</h2>

    <div class="text-right text-2xl leading-relaxed text-gray-900 font-arabic select-text my-2">
      {{ item.arab }}
    </div>

    <div v-if="expanded" class="space-y-1">
      <p class="text-sm italic text-gray-600">{{ item.latin }}</p>
      <p class="text-sm text-gray-700">"{{ item.arti }}"</p>
    </div>

    <div class="mt-3 flex justify-between items-center">
      <button @click="toggleExpand" class="text-sm text-green-600 hover:underline">
        {{ expanded ? 'Sembunyikan Arti' : 'Tampilkan Arti & Latin' }}
      </button>
      <button @click="copyDoa" class="text-sm text-gray-500 hover:text-green-600">
        📋 Salin
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ item: Object })
const expanded = ref(false)
const toggleExpand = () => (expanded.value = !expanded.value)

function copyDoa() {
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
