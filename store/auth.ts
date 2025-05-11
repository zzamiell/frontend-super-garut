import { api } from '~/utils/api'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    product: null,
    loading: false,
    token : null,
    error: null as any | null
  }),
  actions: {
    async fetchProduct(id: string) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get(`/products/${id}`)
        if (!response.ok) throw new Error('Product not found')
        this.product = await response.json()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})