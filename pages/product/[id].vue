<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  console.log('Product ID:', route.params.id)
})
</script>

<template>
  <div>
    <h1>Product Details</h1>
  </div>
</template>
