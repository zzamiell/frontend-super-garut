import { defineStore } from 'pinia'
var { $api, $toast } = useNuxtApp()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: null,
    loading: false,
    token: null,
    error: null as any | null,
  }),
  getters: {
    nuxt: () => useNuxtApp(),
    $api: () => useNuxtApp().$api,
    $toast: () => useNuxtApp().$toast,
  },
  actions: {
    async login(payload: any) {
      const nuxtApp = useNuxtApp()

      try {
        const res = await this.$api.post(`/api/v1/auth/login`, {
          body: payload
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
      } finally {
      }
    },
  },
})
