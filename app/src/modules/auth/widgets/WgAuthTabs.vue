<script setup lang="ts">
import { ref } from 'vue'
import VimTabs from '@/shared/components/VimTabs.vue'
import WgSingIn from '@/modules/auth/widgets/WgSingIn.vue'
import WgLogIn from '@/modules/auth/widgets/WgLogIn.vue'

const tabs = [
  { name: 'registration', title: 'Регистрация', disabled: false },
  { name: 'login', title: 'Вход', disabled: false },
]

const currentTab = ref('profile')
</script>

<template>
  <VimTabs :tabs="tabs" v-model="currentTab">
    <template #registration>
      <wg-sing-in />
    </template>
    <template #login>
      <wg-log-in />
    </template>
  </VimTabs>
</template>

<style scoped></style>
