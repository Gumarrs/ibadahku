<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h2 class="text-xl font-bold text-green-700 mb-4">🕌 Masjid Terdekat</h2>

    <div v-if="loading" class="text-gray-500">🔄 Mendeteksi lokasi & mencari masjid...</div>
    <div v-else-if="error" class="text-red-500">⚠️ {{ error }}</div>
    
    <ul v-else class="space-y-3">
      <li
        v-for="(mosque, index) in mosques"
        :key="index"
        @click="openInMaps(mosque.lat, mosque.lon)"
        class="bg-gray-50 p-3 rounded-md shadow-sm cursor-pointer hover:bg-green-50 transition"
      >
        <p class="text-green-700 font-semibold">
          {{ mosque.name || 'Masjid Tanpa Nama' }}
        </p>
        <p class="text-sm text-gray-600">
          Jarak: {{ mosque.distance.toFixed(1) }} km
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLat: null,
      userLng: null,
      mosques: [],
      loading: true,
      error: null,
    }
  },
  mounted() {
    this.getLocation()
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.userLat = position.coords.latitude
            this.userLng = position.coords.longitude
            this.fetchNearbyMosques()
          },
          err => {
            this.error = 'Gagal mendapatkan lokasi. Aktifkan GPS dan izinkan akses lokasi.'
            this.loading = false
          },
          { enableHighAccuracy: true, timeout: 10000 }
        )
      } else {
        this.error = 'Browser tidak mendukung geolocation.'
        this.loading = false
      }
    },
    async fetchNearbyMosques() {
      const radius = 2000 // radius pencarian dalam meter
      const overpassUrl = 'https://overpass-api.de/api/interpreter'
      const query = `
        [out:json];
        (
          node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${this.userLat},${this.userLng});
        );
        out center;
      `

      try {
        const res = await fetch(overpassUrl, {
          method: 'POST',
          body: query,
        })
        const data = await res.json()
        this.mosques = data.elements
          .map(el => ({
            name: el.tags?.name || null,
            lat: el.lat,
            lon: el.lon,
            distance: this.calculateDistance(el.lat, el.lon),
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5)
      } catch (err) {
        this.error = 'Gagal mengambil data masjid dari server.'
      } finally {
        this.loading = false
      }
    },
    calculateDistance(lat2, lon2) {
      const R = 6371 // Radius bumi dalam km
      const dLat = this.deg2rad(lat2 - this.userLat)
      const dLon = this.deg2rad(lon2 - this.userLng)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(this.userLat)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return R * c
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180)
    },
    openInMaps(lat, lon) {
      const url = `https://www.google.com/maps?q=${lat},${lon}`
      window.open(url, '_blank')
    },
  },
}
</script>
