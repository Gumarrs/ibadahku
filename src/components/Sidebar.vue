<template>
  <div class="w-64 bg-white shadow-md h-full">
    <div class="p-6 text-xl font-bold text-green-700">
      Ibadahku 🕌
    </div>
    <nav class="px-4">
      <router-link
        to="/"
        class="block py-2 px-4 rounded hover:bg-green-100"
        active-class="bg-green-200 font-semibold"
        exact
      >Dashboard</router-link>
      <router-link
        to="/jadwal"
        class="block py-2 px-4 rounded hover:bg-green-100"
        active-class="bg-green-200 font-semibold"
      >Jadwal Sholat</router-link>
      <router-link
        to="/kiblat"
        class="block py-2 px-4 rounded hover:bg-green-100"
        active-class="bg-green-200 font-semibold"
      >Arah Kiblat</router-link>
      <router-link
        to="/kalender"
        class="block py-2 px-4 rounded hover:bg-green-100"
        active-class="bg-green-200 font-semibold"
      >Kalender Hijriyah</router-link>
      <router-link
        to="/doa"
        class="block px-4 py-2 text-gray-700 hover:bg-green-100 rounded-md"
        >
        Doa & Dzikir
        </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>
