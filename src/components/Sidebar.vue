<template>
  <div class="w-64 bg-white shadow-md h-full">
    <div class="p-6 text-xl font-bold text-green-700">
      Jadwal Sholat 🕌
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
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>
