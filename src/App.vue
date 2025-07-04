<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 p-4 bg-gray-100">
      <Header />
      <router-view /> <!-- Di sinilah konten halaman muncul -->
    </div>
  </div>
</template>
