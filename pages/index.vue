<template>
  <div class="welcome-page">
    <Card class="welcome-card">
      <template #header>
        <img alt="header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
      </template>
      <template #title>Welcome to Our Application</template>
      <template #subtitle>We're glad to have you here!</template>
      <template #content>
        <p class="m-0">
          Thank you for choosing our platform. We hope you enjoy your experience.
          Please feel free to explore our features and let us know if you need any assistance.
        </p>
      </template>
      <template #footer>
        <Button label="Get Started" icon="pi pi-check" @click="navigateToHome" />
        <Button label="Learn More" icon="pi pi-info-circle" class="p-button-secondary" @click="navigateToAbout" />
      </template>
    </Card>
  </div>
</template>

<script setup>
const router = useRouter();

const navigateToHome = () => {
  router.push('/');
};

const navigateToAbout = () => {
  router.push('/about');
};
</script>

<style scoped>
.welcome-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--surface-ground);
}

.welcome-card {
  width: 100%;
  max-width: 500px;
}

.p-card-footer {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>