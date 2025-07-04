<template>
  <div class="flex h-screen bg-gradient-to-br from-white to-green-50 text-gray-800">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Header -->
      <Header />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto px-4 py-6 bg-white">
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
  }
}
</script>

<style scoped>
/* Reset padding dan font */
body, html, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Inter', sans-serif;
  background-color: #f9fafb;
}
</style>
