<template>
  <div class="text-center p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-green-700 mb-2">🧭 Arah Kiblat</h2>
    <p class="text-sm text-gray-600 mb-4">Lokasi: {{ city || 'Mendeteksi lokasi...' }}</p>

    <div
      v-if="kiblatDirection !== null"
      class="relative mx-auto w-64 max-w-full aspect-square rounded-full border-4 border-green-500 flex items-center justify-center"
    >
      <!-- Titik tengah -->
      <div class="w-2 h-2 bg-green-800 rounded-full z-10"></div>

      <!-- Jarum kiblat -->
      <div
        class="absolute w-1 h-32 bg-green-600 origin-bottom"
        :style="{ transform: `rotate(${kiblatDirection}deg)` }"
      ></div>
    </div>

    <p v-if="kiblatDirection !== null" class="mt-4 text-gray-700">
      Arah kiblat: <strong>{{ kiblatDirection.toFixed(2) }}°</strong> dari utara
    </p>
    <p v-else class="text-red-500 mt-4">Gagal mendeteksi arah kiblat.</p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userLat: null,
      userLng: null,
      kiblatDirection: null,
      city: null,
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
            this.getCityName()
            this.calculateQibla()
          },
          error => {
            console.error('Gagal mendeteksi lokasi:', error)
          }
        )
      } else {
        alert('Geolocation tidak didukung di browser ini.')
      }
    },
    calculateQibla() {
      const kaabaLat = 21.4225
      const kaabaLng = 39.8262

      const φ1 = this.deg2rad(this.userLat)
      const φ2 = this.deg2rad(kaabaLat)
      const Δλ = this.deg2rad(kaabaLng - this.userLng)

      const y = Math.sin(Δλ) * Math.cos(φ2)
      const x =
        Math.cos(φ1) * Math.sin(φ2) -
        Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
      const θ = Math.atan2(y, x)
      const bearing = (this.rad2deg(θ) + 360) % 360

      this.kiblatDirection = bearing
    },
    deg2rad(deg) {
      return (deg * Math.PI) / 180
    },
    rad2deg(rad) {
      return (rad * 180) / Math.PI
    },
    async getCityName() {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.userLat}&lon=${this.userLng}`)
        const data = await res.json()
        this.city = data.address.city || data.address.town || data.address.village || 'Tidak diketahui'
      } catch (e) {
        console.warn('Gagal mengambil nama kota:', e)
      }
    }
  }
}
</script>
