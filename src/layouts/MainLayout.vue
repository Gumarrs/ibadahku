<template>
  <div class="flex h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Header -->
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
