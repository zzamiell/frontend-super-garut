import { useToast } from 'primevue/usetoast'

export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast()

  const toastService = {
    success: (message: string) => {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: message,
        life: 3000
      })
    },
    error: (message: string) => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000
      })
    },
    info: (message: string) => {
      toast.add({
        severity: 'info',
        summary: 'Info',
        detail: message,
        life: 3000
      })
    }
  }

  return {
    provide: {
      toast: toastService
    }
  }
})