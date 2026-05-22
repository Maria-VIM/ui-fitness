<script setup lang="ts">
import VimTextbox from "@/shared/components/VimTextbox.vue";
import VimButton from "@/shared/components/VimButton.vue";
import {ref} from "vue";

const login = ref<string>('');
const password = ref<string>('');
const againPassword = ref<string>('');
</script>

<template>
  <div class="wrapper">
    <div class="form">
      <VimTextbox type="email" v-model="login" label="электронная почта"/>
      <VimTextbox type="password" v-model="password" label="пароль"/>
      <VimTextbox type="password" v-model="againPassword" label="пароль (ещё раз)"/>
      <VimButton text="зарегистрироваться"/>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.form {
  margin: 0 15px
}
</style>
