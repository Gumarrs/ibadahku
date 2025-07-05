<template>
  <div class="flex h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 relative overflow-hidden">
    
    <!-- Sidebar (mobile responsive) -->
    <div
      :class="[
        'fixed z-40 md:static top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0'
      ]"
    >
      <Sidebar />
    </div>

    <!-- Overlay (hanya di mobile) -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
    ></div>

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden relative">
      
      <!-- Header -->
      <div class="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow">
        <button @click="isSidebarOpen = !isSidebarOpen" class="text-gray-700 dark:text-gray-200 text-xl">
          ☰
        </button>
        <span class="text-green-700 dark:text-green-300 font-bold text-lg">Jadwal Sholat</span>
      </div>
      
      <Header />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto px-4 py-6 bg-white dark:bg-gray-800">
        <router-view />
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'MainLayout',
  components: {
    Sidebar,
    Header,
    Footer
  },
  data() {
    return {
      isSidebarOpen: false
    }
  }
}
</script>

<style scoped>
body, html, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Inter', sans-serif;
  background-color: #f9fafb;
}
</style>
