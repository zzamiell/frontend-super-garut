import { defineStore } from 'pinia'

interface LoginPayload {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: null,
    loading: false,
    token: null,
    error: null as unknown | null,
  }),
  getters: {
    nuxt: () => useNuxtApp(),
    $api: () => useNuxtApp().$api,
    $toast: () => useNuxtApp().$toast,
  },
  actions: {
    async login(payload: LoginPayload) {
      this.loading = true
      try {
       const formData = new FormData();
        formData.append('email', payload.email);
        formData.append('password', payload.password);

        const res = await this.$api.post(`/api/v1/auth/login`, {
          body: formData
        })

        this.token = res.data.token

        useCookie('auth_token', {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          secure: false, // Only send over HTTPS
          sameSite: 'strict', // Prevent CSRF
          httpOnly: false // Prevent client-side access
        }).value = res.data.token

        this.$toast.success('Login successful')
        return res
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
})
