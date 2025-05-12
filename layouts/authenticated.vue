<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <h2>Admin Panel</h2>
      </div>
      <nav>
        <NuxtLink to="/admin/dashboard" class="nav-link">
          <i class="pi pi-home"></i> Dashboard
        </NuxtLink>
        <NuxtLink to="/admin/users" class="nav-link">
          <i class="pi pi-users"></i> Users
        </NuxtLink>
        <NuxtLink to="/admin/settings" class="nav-link">
          <i class="pi pi-cog"></i> Settings
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <button class="menu-toggle" @click="toggleSidebar">
            <i class="pi pi-bars"></i>
          </button>
        </div>
        <div class="header-right">
          <button class="logout-btn" @click="logout">
            <i class="pi pi-sign-out"></i> Logout
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <div class="content-wrapper">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const logout = async () => {
  navigateTo('/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  transition: width 0.3s;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-wrapper {
  padding: 1rem;
  flex: 1;
}

.nav-link {
  display: block;
  padding: 1rem;
  color: white;
  text-decoration: none;
  transition: background 0.3s;
}

.nav-link:hover {
  background: #34495e;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.menu-toggle {
  display: none;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -250px;
    z-index: 100;
  }
  
  .menu-toggle {
    display: block;
  }
}
</style>