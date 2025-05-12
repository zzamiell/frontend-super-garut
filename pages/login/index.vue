<script setup lang="ts">
import { ref, reactive } from 'vue'
import { formHelper } from '~/utils/helper'
import { useAuthStore } from '~/store/auth'

definePageMeta({
  layout: "default",
  middleware: "auth",
});

const { isQueryInvalid } = formHelper
const $auth = useAuthStore()

const checked = ref<boolean>(false)
const query = reactive({
  email: '',
  password: ''
})

async function login() {
 await $auth.login(query)

 navigateTo('/dashboard')
}
</script>

<template>
    <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
    <div class="flex flex-col items-center justify-center">
      <div
        style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
          <div class="text-center mb-8">
            <div class="flex items-center justify-center mb-4">
              <!-- <img :src="logo" alt="Logo" class="h-[55px]" /> -->
            </div>
          </div>
          <form @submit.prevent="login">
            <div>
              <label for="email1"
                class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
              <InputText id="email1" type="text" placeholder="Alamat email" class="w-full md:w-[30rem] mb-8"
                v-model="query.email" />

              <label for="password1"
                class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
              <Password id="password1" v-model="query.password" placeholder="Password" :toggleMask="true" class="mb-4"
                fluid :feedback="false"></Password>

              <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                <div class="flex items-center">
                  <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                  <label for="rememberme1">Ingat Saya</label>
                </div>
                <!-- <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Lupa Password?</span> -->
              </div>
              <Button type="submit" :disabled="isQueryInvalid(query)" label="Login"
                class="w-full"></Button>
              <p class="m-0 text-muted-color mt-8 text-center">Version 0.0.0</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>