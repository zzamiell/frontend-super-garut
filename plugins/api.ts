import { useAuthStore } from '~/store/auth'

export default defineNuxtPlugin(() => {
  const originalFetch = window.fetch
  
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    // Add global headers or modify request
    const headers = new Headers(init?.headers)
    headers.append('Content-Type', 'application/json')
    
    // Add auth token if available
    const authStore = useAuthStore()
    if (authStore?.token) {
      headers.append('Authorization', `Bearer ${authStore?.token}`)
    }

    const modifiedInit = {
      ...init,
      headers
    }

    try {
      const response = await originalFetch(input, modifiedInit)
      
      // Handle global response errors
      if (response.status === 401) {
        // authStore.logout()
      }
      
      return response
    } catch (error) {
      // Handle global errors
      console.error('Fetch error:', error)
      throw error
    }
  }
})