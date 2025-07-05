<!-- src/views/MasjidView.vue -->
<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
      <h2 class="text-xl font-bold text-green-700 dark:text-green-400 mb-4">🗺️ Peta Masjid Terdekat</h2>
      <div id="map" class="w-full h-96 rounded-lg shadow-inner"></div>
    </div>

    <NearbyMosques />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import NearbyMosques from '@/components/NearbyMosques.vue'

onMounted(() => {
  if (!navigator.geolocation) {
    alert('Geolocation tidak didukung di browser ini.')
    return
  }

  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude
    const lng = pos.coords.longitude

    const map = L.map('map').setView([lat, lng], 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    // Marker pengguna
    L.marker([lat, lng]).addTo(map).bindPopup('📍 Kamu di sini').openPopup()

    // Ambil masjid dari Overpass API
    const radius = 2000
    const query = `
      [out:json];
      (
        node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});
      );
      out center;
    `
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    })
    const data = await res.json()

    data.elements.forEach(el => {
      L.marker([el.lat, el.lon])
        .addTo(map)
        .bindPopup(el.tags?.name || 'Masjid tanpa nama')
    })
  })
})
</script>

<style scoped>
#map {
  height: 400px;
  width: 100%;
}
</style>
