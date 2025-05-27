<template>
    <div class="space-y-4">
        <!-- Search & Filter -->
        <div class="flex gap-2">
            <InputText v-model="searchQuery" placeholder="Cari bengkel atau jasa…" class="flex-1" />
            <div class="relative flex-shrink-0">
                <Button icon="pi pi-filter" @click="openFilter" severity="secondary" class="!p-3" />
                <Badge v-if="filterCount > 0" :value="filterCount" severity="success"
                    class="absolute -top-2 -right-2 z-10" />
            </div>
        </div>

        <!-- Filter Sidebar -->
        <Sidebar v-model:visible="showFilter" position="right" header="Filter Layanan" class="w-full sm:w-80">
            <div class="pb-20 space-y-4">
                <div>
                    <label class="text-sm font-medium block mb-1">Tipe Kendaraan</label>
                    <Dropdown v-model="tempFilter.vehicle" :options="vehicleTypes" optionLabel="label"
                        placeholder="Pilih tipe" class="w-full" />
                </div>

                <div>
                    <label class="text-sm font-medium block mb-1">Lokasi</label>
                    <Dropdown v-model="tempFilter.location" :options="locations" optionLabel="label"
                        placeholder="Pilih lokasi" class="w-full" />
                </div>

                <div>
                    <label class="text-sm font-medium block mb-1">Urutkan</label>
                    <Dropdown v-model="tempFilter.sort" :options="computedSortOptions" optionLabel="label"
                        optionDisabled="disabled" placeholder="Urutkan berdasarkan" class="w-full" />
                    <div v-if="locationError && tempFilter.sort?.value === 'nearest'"
                        class="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-200 mt-2">
                        Untuk menyaring berdasarkan lokasi terdekat, Anda perlu mengaktifkan akses lokasi.
                    </div>
                </div>
            </div>

            <div class="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-3 flex gap-2 sm:w-80 ml-auto">
                <Button label="Reset" class="w-full" severity="secondary" v-if="filterCount > 0" @click="resetFilter" />
                <Button label="Terapkan" class="w-full" @click="applyFilter" />
            </div>
        </Sidebar>

        <!-- List Jasa -->
        <div class="space-y-4">
            <!-- State saat tidak ada hasil -->
            <div v-if="filteredServices.length === 0 && !loading" class="text-center text-gray-500 py-10">
                <p>Tidak ada layanan ditemukan 😕</p>
            </div>

            <!-- State saat loading (opsional) -->
            <div v-else-if="loading" class="text-center text-gray-400 py-10 animate-pulse">
                <p>Memuat layanan terdekat...</p>
            </div>
            <div v-for="(service, i) in filteredServices" :key="i" class="flex gap-4 p-4 border rounded-lg shadow-sm">
                <!-- Image -->
                <img :src="service.image" alt="foto bengkel" class="w-20 h-20 object-cover rounded-md" />
                <!-- Info -->
                <div class="flex flex-col justify-between flex-1">
                    <div>
                        <div class="text-lg font-semibold">{{ service.name }}</div>
                        <div class="text-sm text-gray-500 mb-1">{{ service.vehicle }}</div>
                        <div class="flex items-center text-sm text-gray-500 gap-2">
                            <span class="text-yellow-500">⭐ {{ service.rating }}</span>
                            <span>({{ service.reviews }} ulasan)</span>
                        </div>
                        <div class="text-sm text-gray-500 mt-1">
                            📍 {{ service.location }} · {{ service.distance !== undefined ? service.distance + ' km' :
                                '-' }}
                        </div>
                    </div>

                    <Button label="Pesan Sekarang" class="w-fit mt-2" size="small" as="router-link"
                        :to="`/order/service/${service.id}`" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import Dropdown from 'primevue/dropdown'
import Badge from 'primevue/badge'
import { getDistance } from '~/utils/getDistance'
import { useLocation } from '~/composables/useLocation'

definePageMeta({
    layout: 'authenticated',
})

const { userLocation, locationError, loading, refreshLocation } = useLocation()
const showFilter = ref(false)
const searchQuery = ref('')

const filterCount = computed(() => {
    let count = 0
    if (activeFilter.value.vehicle) count++
    if (activeFilter.value.location) count++
    if (activeFilter.value.sort) count++
    return count
})

const tempFilter = ref({ vehicle: null, location: null, sort: null })
const activeFilter = ref({ vehicle: null, location: null, sort: null })

function openFilter() {
    tempFilter.value = { ...activeFilter.value }
    showFilter.value = true
}

function applyFilter() {
    activeFilter.value = { ...tempFilter.value }
    showFilter.value = false
}

function resetFilter() {
    tempFilter.value = { vehicle: null, location: null, sort: null }
}

const vehicleTypes = ref([
    { label: 'Motor', value: 'motor' },
    { label: 'Mobil', value: 'mobil' }
])

const locations = ref([
    { label: 'Garut Kota', value: 'garut_kota' },
    { label: 'Cibatu', value: 'cibatu' }
])

const computedSortOptions = computed(() => [
    { label: 'Terdekat', value: 'nearest', disabled: !userLocation.value },
    { label: 'Rating Tertinggi', value: 'rating', disabled: false }
])

const allServices = ref([
    {
        id: 1,
        name: 'Bengkel A',
        description: 'Service motor dan mobil.',
        location: 'Garut Kota',
        vehicle: 'motor',
        rating: 4.8,
        reviews: 120,
        image: 'https://plus.unsplash.com/premium_photo-1677009835876-4a29ddc4cc2c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        lat: -7.2106,
        lng: 107.9007
    },
    {
        id: 2,
        name: 'Bengkel B',
        description: 'Spesialis motor.',
        location: 'Cibatu',
        vehicle: 'motor',
        rating: 4.5,
        reviews: 80,
        image: 'https://plus.unsplash.com/premium_photo-1677009835876-4a29ddc4cc2c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        lat: -7.1001,
        lng: 107.9205
    }
])

const filteredServices = computed(() => {
    let result = allServices.value.filter(s =>
        (!searchQuery.value || s.name.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
        (!activeFilter.value.vehicle || s.vehicle === activeFilter.value.vehicle.value) &&
        (!activeFilter.value.location || s.location === activeFilter.value.location.value)
    )

    if (activeFilter.value.sort?.value === 'nearest') {
        result = result.sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999))
    } else if (activeFilter.value.sort?.value === 'rating') {
        result = result.sort((a, b) => b.rating - a.rating)
    }

    return result
})

watchEffect(() => {
    if (userLocation.value) {
        allServices.value = allServices.value.map(service => {
            const dist = getDistance(
                userLocation.value!.lat,
                userLocation.value!.lng,
                service.lat,
                service.lng
            )
            return { ...service, distance: Number(dist.toFixed(1)) }
        })
    }
})
</script>
