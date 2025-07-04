<template>
  <div class="p-6 max-w-xl mx-auto text-center bg-white rounded-xl shadow-lg space-y-4">
    <h1 class="text-2xl font-bold text-green-700">🧭 Arah Kiblat</h1>
    <p class="text-sm text-gray-500">Lokasi: {{ city || 'Mendeteksi lokasi...' }}</p>

    <!-- Kompas -->
    <div class="relative mx-auto aspect-square w-64 max-w-full rounded-full border-4 border-green-500 flex items-center justify-center">
      <!-- Titik pusat -->
      <div class="absolute w-4 h-4 bg-green-800 rounded-full z-10"></div>

      <!-- Jarum arah kiblat -->
      <div
        class="absolute top-1/2 left-1/2 w-1 h-[40%] bg-green-600 origin-bottom translate-x-[-50%] translate-y-[-100%] transition-transform duration-500 ease-in-out"
        :style="{ transform: `translate(-50%, -100%) rotate(${kiblatDirection}deg)` }"
      ></div>

      <!-- Label Arah Kompas -->
      <div
        v-for="(dir, index) in directions"
        :key="dir.label"
        class="absolute text-[10px] sm:text-xs font-bold text-gray-500"
        :style="{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(${index * 45}deg) translateY(-110px) rotate(${-index * 45}deg)`
        }"
      >
        {{ dir.label }}
      </div>
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
      directions: [
        { label: 'N' }, { label: 'NE' }, { label: 'E' }, { label: 'SE' },
        { label: 'S' }, { label: 'SW' }, { label: 'W' }, { label: 'NW' }
      ]
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

<style scoped>
/* Tambahan opsional jika ingin efek glowing */
</style>
