<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
})

// Dummy data untuk banner
const banner = ref({
  title: 'Promo Spesial Tebar Garut!',
  subtitle: 'Dapatkan potongan harga khusus untuk ojek online dan booking service kendaraan.',
  actionLabel: 'Pesan Sekarang',
  actionLink: '/order',
  image: 'https://images.unsplash.com/photo-1619531032224-905d5fcd02a4?auto=format&fit=crop&w=1200&q=80'
})

// Dummy data untuk layanan
const services = ref([
  {
    title: 'Ojek Online',
    description: 'Layanan antar jemput cepat, aman, dan terjangkau.',
    // icon: '🛵',
    link: '/order/ojek',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=60'
  },
  {
    title: 'Booking Service',
    description: 'Booking service motor & mobil di bengkel mitra terpercaya.',
    // icon: '🚗',
    link: '/order/service',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=60'
  }
])

// Dummy data untuk berita
const newsItems = ref([
  {
    title: 'Garut Fair 2025: Promo Spesial Hadir!',
    date: '15 Mei 2025',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=60',
    link: '/news/garut-fair-2025'
  },
  {
    title: 'Tips Perawatan Motor Saat Musim Hujan',
    date: '10 Mei 2025',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60',
    link: '/news/tips-musim-hujan'
  },
  {
    title: 'Cara Aman Pesan Ojek Online di Libur Panjang',
    date: '5 Mei 2025',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=60',
    link: '/news/cara-aman-ojek'
  }
])
</script>

<template>
  <div class="flex flex-col gap-8 px-4 md:px-8 lg:px-16 py-6">

    <!-- Banner Promosi -->
    <!-- Jika ingin dipakai, uncomment dan sesuaikan -->
    <section
      class="relative rounded-xl overflow-hidden shadow-lg h-64"
    >
      <img
        :src="'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=60'"
        alt="Banner Promo"
        class="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div class="relative z-10 flex flex-col justify-center h-full px-6">
        <h1 class="text-3xl sm:text-4xl font-bold text-white">{{ banner.title }}</h1>
        <p class="mt-2 max-w-lg text-white">{{ banner.subtitle }}</p>
        <a
          :href="banner.actionLink"
          class="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded"
        >
          {{ banner.actionLabel }}
        </a>
      </div>
    </section>

    <!-- Layanan Kami -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Layanan Kami</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="svc in services"
          :key="svc.title"
          class="border rounded-lg shadow hover:shadow-lg transition p-4 flex items-center gap-4"
        >
          <img
            :src="svc.image"
            :alt="svc.title"
            class="w-24 h-24 object-cover rounded-lg"
          />
          <div class="flex-1">
            <div class="text-4xl mb-2">{{ svc.icon }}</div>
            <h3 class="text-xl font-semibold">{{ svc.title }}</h3>
            <p class="text-gray-600">{{ svc.description }}</p>
            <a
              :href="svc.link"
              class="inline-block mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Pesan {{ svc.title }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Berita Terbaru -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Berita Terbaru</h2>
      <div class="overflow-x-auto">
        <div class="flex space-x-4">
          <div
            v-for="item in newsItems"
            :key="item.title"
            class="min-w-[280px] border rounded-lg shadow hover:shadow-lg flex-shrink-0"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-40 object-cover rounded-t-lg"
            />
            <div class="p-4 flex flex-col h-full">
              <span class="text-sm text-gray-500 mb-1">{{ item.date }}</span>
              <h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>
              <a
                :href="item.link"
                class="mt-auto text-green-600 hover:underline"
              >
                Baca Selengkapnya
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Responsif padding */
@media (min-width: 768px) {
  .px-4 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
@media (min-width: 1024px) {
  .px-4 {
    padding-left: 4rem;
    padding-right: 4rem;
  }
}
</style>
