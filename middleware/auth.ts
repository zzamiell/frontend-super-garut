export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth_token')

  // If user is not authenticated and trying to access protected routes
  if (!token.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  // // If user is authenticated and trying to access login page
  if (token.value && to.path === '/login') {
    return navigateTo('/dashboard')
  }
})