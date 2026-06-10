<script setup lang="ts">
import VimTextbox from '@/shared/components/VimTextbox.vue'
import VimButton from '@/shared/components/VimButton.vue'
import { ref } from 'vue'
import router from '@/router/index.ts'
import { useMutation } from '@tanstack/vue-query'
import { AUTH_API } from '@/modules/auth/api/auth.ts'

const login = ref<string>('')
const password = ref<string>('')

const { mutate: logIn } = useMutation({
  mutationFn: () => AUTH_API.logIn({ login: login.value, password: password.value }),
  onSuccess: async () => {
    await router.replace('/home')
  },
})
</script>

<template>
  <div class="wrapper">
    <div class="form">
      <VimTextbox type="email" v-model="login" label="электронная почта" />
      <VimTextbox type="password" v-model="password" label="пароль" />
      <VimButton text="войти" @click="logIn" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.form {
  margin: 0 15px;
}

.form > * {
  margin: 10px 0;
}
</style>
