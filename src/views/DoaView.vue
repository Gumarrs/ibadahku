<template>
  <div class="p-6 space-y-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <!-- Judul -->
    <h1 class="text-2xl font-bold text-green-700 dark:text-green-400">📖 Doa & Dzikir Harian</h1>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-3">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="selectedTab = tab"
        :class="[
          'pb-1 px-3 font-semibold transition',
          selectedTab === tab
            ? 'text-green-700 dark:text-green-400 border-b-2 border-green-700 dark:border-green-400'
            : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Konten Tab -->
    <div class="space-y-4">
      <div v-if="selectedTab === 'Doa Pagi & Petang'">
        <DoaDzikir v-for="item in doaPagiPetang" :key="item.id" :item="item" />
      </div>

      <div v-if="selectedTab === 'Dzikir Sesudah Sholat'">
        <DoaDzikir v-for="item in dzikirSholat" :key="item.id" :item="item" />
      </div>

      <div v-if="selectedTab === 'Niat Sholat'">
        <DoaDzikir v-for="item in niatSholat" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DoaDzikir from '@/components/DoaDzikir.vue'

const selectedTab = ref('Doa Pagi & Petang')
const tabs = ['Doa Pagi & Petang', 'Dzikir Sesudah Sholat', 'Niat Sholat']

const doaPagiPetang = [
  { id: 1, judul: 'Doa Bangun Tidur', arab: 'الْـحَمْـدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', latin: 'Alhamdulillahil ladzi ahyana ba’da ma amatana wa ilaihin-nusyur.', arti: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya kami dibangkitkan.' },
  { id: 2, judul: 'Doa Masuk Kamar Mandi', arab: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ', latin: 'Allahumma inni a’udzu bika minal khubutsi wal khoba’its.', arti: 'Ya Allah, aku berlindung kepada-Mu dari jin jantan dan betina.' },
  { id: 3, judul: 'Doa Keluar Kamar Mandi', arab: 'غُفْرَانَكَ', latin: 'Ghufranaka.', arti: 'Aku memohon ampunan-Mu.' },
  { id: 4, judul: 'Doa Sebelum Makan', arab: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ', latin: 'Allahumma barik lana fima razaqtana wa qina ‘adzaban nar.', arti: 'Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami dan lindungilah kami dari siksa neraka.' },
  { id: 5, judul: 'Doa Sesudah Makan', arab: 'الْـحَمْـدُ للهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ', latin: 'Alhamdulillahilladzi at’amana wasaqana waja’alana minal muslimin.', arti: 'Segala puji bagi Allah yang telah memberi makan, minum, dan menjadikan kami termasuk muslim.' },
  { id: 6, judul: 'Doa Keluar Rumah', arab: 'بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ', latin: 'Bismillah, tawakkaltu ‘alallah, la haula wa la quwwata illa billah.', arti: 'Dengan nama Allah, aku bertawakkal kepada-Nya, tiada daya dan kekuatan melainkan dengan pertolongan Allah.' },
  { id: 7, judul: 'Doa Masuk Rumah', arab: 'بِسْـمِ اللهِ وَلَجْنَا وَبِسْـمِ اللهِ خَرَجْنَا وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا', latin: 'Bismillah walajna wa bismillah kharajna wa ‘alallahi rabbina tawakkalna.', arti: 'Dengan nama Allah kami masuk dan keluar, kepada Allah Tuhan kami kami bertawakal.' },
  { id: 8, judul: 'Doa Pagi', arab: 'أَصْبَـحْنَا وَأَصْبَـحَ الْمُلْكُ للهِ', latin: 'Ashbahna wa ashbahal mulku lillah.', arti: 'Kami memasuki waktu pagi dan kerajaan hanya milik Allah.' },
  { id: 9, judul: 'Doa Petang', arab: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ', latin: 'Amsaina wa amsal mulku lillah.', arti: 'Kami memasuki waktu petang dan kerajaan hanya milik Allah.' },
]

const dzikirSholat = [
  { id: 1, judul: 'Istighfar 3x', arab: 'أَسْتَغْفِرُ اللهَ', latin: 'Astaghfirullah.', arti: 'Aku memohon ampun kepada Allah.' },
  { id: 2, judul: 'Sayyidul Istighfar', arab: 'اللَّهُمَّ أَنْتَ رَبِّي...', latin: 'Allahumma anta Rabbi...', arti: 'Ya Allah Engkau Tuhanku, tidak ada Tuhan selain Engkau...' },
  { id: 3, judul: 'Tasbih 33x', arab: 'سُبْحَانَ اللَّهِ', latin: 'Subhanallah.', arti: 'Maha Suci Allah.' },
  { id: 4, judul: 'Tahmid 33x', arab: 'الْـحَمْدُ للهِ', latin: 'Alhamdulillah.', arti: 'Segala puji bagi Allah.' },
  { id: 5, judul: 'Takbir 34x', arab: 'اللَّهُ أَكْبَرُ', latin: 'Allahu Akbar.', arti: 'Allah Maha Besar.' },
  { id: 6, judul: 'Dzikir Penutup', arab: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ...', latin: 'Laa ilaaha illallaahu wahdahu laa syariikalahu...', arti: 'Tidak ada Tuhan selain Allah, tiada sekutu bagi-Nya...' },
]

const niatSholat = [
  { id: 1, judul: 'Sholat Subuh', arab: 'أُصَلِّي فَرْضَ الصُّبْحِ', latin: 'Ushallii fardhas-shubhi...', arti: 'Aku niat sholat fardhu Subuh dua rakaat karena Allah.' },
  { id: 2, judul: 'Sholat Dzuhur', arab: 'أُصَلِّي فَرْضَ الظُّهْرِ', latin: 'Ushallii fardhazh-zhuhri...', arti: 'Aku niat sholat fardhu Dzuhur empat rakaat karena Allah.' },
  { id: 3, judul: 'Sholat Ashar', arab: 'أُصَلِّي فَرْضَ الْعَصْرِ', latin: 'Ushallii fardhal-‘ashri...', arti: 'Aku niat sholat fardhu Ashar empat rakaat karena Allah.' },
  { id: 4, judul: 'Sholat Maghrib', arab: 'أُصَلِّي فَرْضَ الْمَغْرِبِ', latin: 'Ushallii fardhal-maghribi...', arti: 'Aku niat sholat fardhu Maghrib tiga rakaat karena Allah.' },
  { id: 5, judul: 'Sholat Isya', arab: 'أُصَلِّي فَرْضَ الْعِشَاءِ', latin: 'Ushallii fardhal-‘isyaa’i...', arti: 'Aku niat sholat fardhu Isya empat rakaat karena Allah.' },
  { id: 6, judul: 'Sholat Dhuha', arab: 'أُصَلِّي سُنَّةَ الضُّحَى', latin: 'Ushallii sunnatadh-dhuhaa...', arti: 'Aku niat sholat sunnah Dhuha dua rakaat karena Allah.' },
  { id: 7, judul: 'Sholat Tahajud', arab: 'أُصَلِّي سُنَّةَ التَهَجُّدِ', latin: 'Ushallii sunnatath-tahajjud...', arti: 'Aku niat sholat sunnah Tahajud dua rakaat karena Allah.' },
  { id: 8, judul: 'Sholat Witir', arab: 'أُصَلِّي سُنَّةَ الْوِتْرِ', latin: 'Ushallii sunnatal-witri...', arti: 'Aku niat sholat sunnah Witir satu rakaat karena Allah.' },
  { id: 9, judul: 'Sholat Istikharah', arab: 'أُصَلِّي سُنَّةَ الاِسْتِخَارَةِ', latin: 'Ushallii sunnatal-istikharah...', arti: 'Aku niat sholat sunnah Istikharah dua rakaat karena Allah.' },
]
</script>
