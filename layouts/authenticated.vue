<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <div class="flex items-center justify-between gradient-dark-bg py-4 px-8 sticky top-0 z-50">
      <!-- Logo dan Judul -->
      <div class="flex items-center space-x-3">
        <img src="https://www.transtrack.co/logo.svg" alt="Logo" class="w-10 h-10 object-contain shadow-sm" />
        <h1 class="text-lg sm:text-xl font-bold tracking-wide text-white">Tebar Garut</h1>
      </div>

      <!-- Notifikasi dan Avatar -->
      <div class="flex items-center space-x-4">
        <button class="relative hover:text-green-200 transition duration-200" aria-label="Notifications">
          <i class="pi pi-bell text-xl text-white"></i>
          <span
            class="absolute -top-1 -right-1 inline-block w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div class="relative group cursor-pointer">
          <img src="https://i.pravatar.cc/40?img=3" alt="User Avatar"
            class="w-9 h-9 rounded-full border-2 border-white shadow-md object-cover" />
          <!-- Dropdown menu -->
          <div
            class="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-md shadow-lg overflow-hidden z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-200">
            <a href="/profile" class="block px-4 py-2 hover:bg-gray-100">Profil</a>
            <a href="/logout" class="block px-4 py-2 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Router / Tab View Area -->
    <main class="px-4 md:px-8 lg:px-16 md:pt-8 pt-4 pb-20">
      <slot />
    </main>

    <!-- Bottom Navigation -->
    <Tabs value="/dashboard" class="fixed bottom-0 w-full custom-tab">
      <TabList class="flex justify-center gap-8">
        <Tab v-for="tab in items" :key="tab.label" :value="tab.route" class="flex items-center justify-center">
          <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
            <a :href="href" @click="navigate" class="flex flex-col md:flex-row items-center gap-1 text-inherit">
              <i :class="tab.icon" />
              <span class="text-black">{{ tab.label }}</span>
            </a>
          </router-link>
        </Tab>
      </TabList>
    </Tabs>

  </div>
</template>

<script setup>
import { ref } from "vue";

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';

// import { useRouter } from "vue-router";

// const router = useRouter();
// const active = ref(0);
const items = ref([
  { route: '/dashboard', label: 'Dashboard', icon: 'pi pi-home' },
  { route: '/order', label: 'Transaksi', icon: 'pi pi-shopping-cart' },
  { route: '/history', label: 'History', icon: 'pi pi-history' },
  { route: '/profile', label: 'Profile', icon: 'pi pi-user' }
]);

// function onTabChange(e) {
//   active.value = e.index;
//   router.push(items[e.index].to);
// }
</script>

<style scoped>
.custom-tab {
  --p-tabs-tablist-background: white !important;
  --p-tabs-active-bar-height: 2px !important;
  --p-tabs-active-bar-bottom: auto !important;
  --p-tabs-active-bar-background: #5EC269 !important;
}

.custom-tab .p-tab {
  flex: 1 1 auto;
  text-align: center;
}
</style>
