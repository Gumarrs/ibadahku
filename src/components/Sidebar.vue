<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:static z-40 md:z-auto top-0 left-0 w-64 h-full bg-white shadow-md transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div class="p-5 border-b border-gray-200">
        <h1 class="text-lg font-bold text-green-700">🕌 Ibadahku</h1>
      </div>
      <nav class="mt-4 space-y-1 px-4">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block py-2 px-3 rounded hover:bg-green-100"
          active-class="bg-green-200 text-green-800 font-semibold"
          exact
        >
          {{ link.label }}
        </router-link>
      </nav>
    </aside>

    <!-- Overlay Mobile -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar Mobile -->
      <header class="md:hidden bg-white px-4 py-3 shadow flex items-center justify-between">
        <button @click="toggleSidebar" class="text-green-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <span class="font-semibold text-green-700">Ibadahku</span>
        <div class="w-6"></div>
      </header>

      <!-- Slot Konten -->
      <main class="p-4 overflow-y-auto flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isSidebarOpen = ref(false)
const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value)

const navLinks = [
  { label: 'Dashboard', to: '/' },
  { label: 'Jadwal Sholat', to: '/jadwal' },
  { label: 'Arah Kiblat', to: '/kiblat' },
  { label: 'Kalender', to: '/kalender' },
  { label: 'Doa & Dzikir', to: '/doa' },
  { label: 'Masjid Terdekat', to: '/masjid' }
]
</script>
