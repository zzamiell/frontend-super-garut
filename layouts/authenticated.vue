<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header
      class="flex items-center justify-between bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 shadow-md"
    >
      <!-- Logo dan Judul -->
      <div class="flex items-center space-x-3">
        <img
          src="https://www.transtrack.co/logo.svg"
          alt="Logo"
          class="w-10 h-10 object-contain shadow-sm"
        />
        <h1 class="text-lg sm:text-xl font-bold tracking-wide">Tebar Garut</h1>
      </div>

      <!-- Notifikasi dan Avatar -->
      <div class="flex items-center space-x-4">
        <button
          class="relative hover:text-green-200 transition duration-200"
          aria-label="Notifications"
        >
          <i class="pi pi-bell text-xl"></i>
          <span
            class="absolute -top-1 -right-1 inline-block w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"
          ></span>
        </button>

        <div class="relative group cursor-pointer">
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt="User Avatar"
            class="w-9 h-9 rounded-full border-2 border-white shadow-md object-cover"
          />
          <!-- Dropdown menu -->
          <div
            class="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-md shadow-lg overflow-hidden z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-200"
          >
            <a href="/profile" class="block px-4 py-2 hover:bg-gray-100">Profil</a>
            <a href="/logout" class="block px-4 py-2 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      </div>
    </header>

    <!-- Router / Tab View Area -->
    <main class="flex-1 overflow-y-auto p-4 bg-gray-50">
       <slot />
    </main>

    <!-- Bottom Navigation -->
    <TabMenu
      :model="items"
      class="fixed bottom-0 left-0 right-0 border-t shadow-lg"
      :activeIndex="active"
      @tab-change="onTabChange"
      style="background: white"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TabMenu from "primevue/tabmenu";
import { useRouter } from "vue-router";

const router = useRouter();
const active = ref(0);
const items = [
  { label: "Home", icon: "pi pi-home", to: "/" },
  { label: "Order", icon: "pi pi-shopping-cart", to: "/order" },
  { label: "History", icon: "pi pi-history", to: "/history" },
  { label: "Profile", icon: "pi pi-user", to: "/profile" },
];

function onTabChange(e) {
  active.value = e.index;
  router.push(items[e.index].to);
}
</script>

<style scoped>
/* Styling TabMenu */
.p-tabmenu {
  background: linear-gradient(90deg, #22c55e, #4ade80); /* Green gradient */
  border-top: none;
  box-shadow: 0 -4px 15px rgba(34, 197, 94, 0.4);
  border-radius: 12px 12px 0 0;
  padding: 6px 12px;
  display: flex;
  justify-content: center;
}

.p-tabmenu .p-menuitem {
  flex: 1;
  text-align: center;
}

.p-tabmenu .p-menuitem-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 10px 0;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.p-tabmenu .p-menuitem-link .pi {
  font-size: 1.5rem;
  line-height: 1;
  transition: transform 0.3s ease;
}

.p-tabmenu .p-menuitem-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: #d1fae5;
}

.p-tabmenu .p-menuitem-link.p-menuitem-active {
  background-color: white;
  color: #22c55e;
  box-shadow: 0 4px 10px rgba(34, 197, 94, 0.4);
}

.p-tabmenu .p-menuitem-link.p-menuitem-active .pi {
  transform: scale(1.3);
  color: #22c55e;
}
</style>
