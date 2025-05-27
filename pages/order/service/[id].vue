<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

definePageMeta({
    layout: 'authenticated',
})

const route = useRoute()
const serviceId = route.params.id as string

// Dummy services
const allServices = [
    {
        id: serviceId,
        name: 'Bengkel A',
        description: 'Service motor dan mobil.',
        location: 'Garut Kota',
        vehicle: 'motor',
        rating: 4.8,
        reviews: 120,
        image: 'https://plus.unsplash.com/premium_photo-1677009835876-4a29ddc4cc2c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        lat: -7.2106,
        lng: 107.9007
    }
]

const service = ref(
    allServices.find((s) => s.id === serviceId) ?? {
        id: '',
        name: 'Data tidak ditemukan',
        description: '',
        location: '',
        vehicle: '',
        rating: 0,
        reviews: 0,
        image: '',
        lat: 0,
        lng: 0
    }
)

// Booking state
const appointment = ref<Date | null>(null)
const notes = ref('')
const notesIssue = ref('')
const successMessage = ref('')
const errorMessage = ref('')

function submitOrder() {
    if (!appointment.value || !notes.value || !notesIssue.value) {
        errorMessage.value = 'Mohon lengkapi semua kolom sebelum memesan.'
        successMessage.value = ''
        return
    }

    const payload = {
        serviceId: service.value.id,
        appointment: appointment.value,
        notes: notes.value,
        notes_issue: notesIssue.value
    }

    console.log('Submit Order:', payload)

    successMessage.value = 'Order berhasil dikirim! ✅'
    errorMessage.value = ''

    // Reset form
    appointment.value = null
    notes.value = ''
    notesIssue.value = ''
}
</script>

<template>
    <div class="p-4 space-y-6">
        <!-- Info Layanan -->
        <div class="space-y-2">
            <img :src="service.image" alt="foto" class="w-full h-48 object-cover rounded-md" />
            <h1 class="text-xl font-bold">{{ service.name }}</h1>
            <p class="text-sm text-gray-600">{{ service.description }}</p>
            <p class="text-sm text-gray-500">📍 {{ service.location }}</p>
            <p class="text-sm text-gray-500">⭐ {{ service.rating }} ({{ service.reviews }} ulasan)</p>


            <Button as="a" :href="`https://www.google.com/maps?q=${service.lat},${service.lng}`" target="_blank"
                icon="pi pi-map-marker" label="Lihat di Google Maps" text size="small" class=" !p-0 mt-2" />


        </div>

        <!-- Alert -->
        <div v-if="errorMessage" class="bg-red-100 text-red-600 text-sm px-4 py-2 rounded">
            {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="bg-green-100 text-green-700 text-sm px-4 py-2 rounded">
            {{ successMessage }}
        </div>

        <!-- Form Booking -->
        <div class="space-y-4">
            <label class="block">
                <span class="text-sm font-medium">Tanggal & Waktu Janji</span>
                <Calendar v-model="appointment" showTime hourFormat="24" class="w-full mt-1" showIcon
                    iconDisplay="input" />
            </label>

            <label class="block">
                <span class="text-sm font-medium">Tipe Kendaraan</span>
                <InputText v-model="notes" placeholder="Contoh: Yamaha Aerox 2021" class="w-full mt-1" />
            </label>

            <label class="block">
                <span class="text-sm font-medium">Keluhan Kendaraan</span>
                <Textarea v-model="notesIssue" rows="3" autoResize class="w-full mt-1" />
            </label>

            <Button label="Pesan Sekarang" @click="submitOrder" class="w-full mt-4" />
        </div>
    </div>
</template>
