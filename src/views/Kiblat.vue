<template>
  <div class="p-6 max-w-xl mx-auto text-center bg-white rounded-xl shadow-lg space-y-4">
    <h1 class="text-2xl font-bold text-green-700">🧭 Arah Kiblat</h1>
    <p class="text-sm text-gray-500">Lokasi: {{ city || 'Mendeteksi lokasi...' }}</p>

    <!-- Kompas -->
    <div class="relative mx-auto aspect-square w-64 max-w-full rounded-full border-4 border-green-500 flex items-center justify-center">
      <div class="w-2 h-2 bg-green-800 rounded-full z-10"></div>

      <!-- Jarum arah kiblat -->
      <div
        class="absolute w-1 h-32 bg-green-600 origin-bottom transition-transform duration-500"
        :style="{ transform: `rotate(${kiblatDirection}deg)` }"
      ></div>
    </div>

    <!-- Keterangan -->
    <p class="text-gray-700">
      Arah kiblat dari lokasi kamu adalah sekitar
      <strong>{{ kiblatDirection.toFixed(2) }}°</strong> dari utara.
    </p>
  </div>
</template>

<script>
export default {
  name: 'KiblatView',
  data() {
    return {
      kiblatDirection: 0,
      city: '',
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.calculateKiblat, this.handleError);
      } else {
        alert('Geolocation tidak didukung oleh browser ini.');
      }
    },
    async calculateKiblat(position) {
      const latUser = position.coords.latitude;
      const lonUser = position.coords.longitude;

      const latKaaba = 21.4225;
      const lonKaaba = 39.8262;

      const phiUser = (latUser * Math.PI) / 180;
      const phiKaaba = (latKaaba * Math.PI) / 180;
      const deltaLambda = ((lonKaaba - lonUser) * Math.PI) / 180;

      const y = Math.sin(deltaLambda) * Math.cos(phiKaaba);
      const x =
        Math.cos(phiUser) * Math.sin(phiKaaba) -
        Math.sin(phiUser) * Math.cos(phiKaaba) * Math.cos(deltaLambda);

      const theta = Math.atan2(y, x);
      let direction = (theta * 180) / Math.PI;
      if (direction < 0) direction += 360;

      this.kiblatDirection = direction;

      // Ambil nama kota (opsional)
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latUser}&lon=${lonUser}`);
        const data = await response.json();
        this.city = data.address.city || data.address.town || data.address.village || 'Lokasi tidak diketahui';
      } catch {
        this.city = 'Lokasi tidak diketahui';
      }
    },
    handleError(error) {
      alert('Gagal mendeteksi lokasi: ' + error.message);
    },
  },
};
</script>
