<template>
  <div class="about-page">
    <Card class="about-card">
      <template #title>About Us</template>
      <template #content>
        <p class="m-0">
          This is the about page of our application. Here you can find more information
          about our company and services.
        </p>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--surface-ground);
}

.about-card {
  width: 100%;
  max-width: 500px;
}
</style>