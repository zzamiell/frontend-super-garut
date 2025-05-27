import { ref, onMounted } from 'vue'

export function useLocation() {
  const userLocation = ref<{ lat: number; lng: number } | null>(null)
  const locationError = ref<string | null>(null)
  const loading = ref(true)

  function fetchLocation() {
    loading.value = true
    if (!navigator.geolocation) {
      locationError.value = 'Geolocation tidak didukung browser ini.'
      loading.value = false
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userLocation.value = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        loading.value = false
      },
      (err) => {
        locationError.value = 'Gagal mendapatkan lokasi user.'
        loading.value = false
      }
    )
  }

  onMounted(() => {
    fetchLocation()
  })

  return {
    userLocation,
    locationError,
    loading,
    refreshLocation: fetchLocation
  }
}
