<script setup lang="ts">
import VimMenu from '@/shared/components/VimMenu.vue'
import VimHeader from '@/shared/components/VimHeader.vue'
import { ref } from 'vue'
const is_login = ref<boolean>(true)
</script>

<template>
  <div class="layout">
    <VimHeader />
    <div class="main-content">
      <VimMenu v-if="is_login" :key="'menu'" />
      <div class="content" :key="'content'">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content {
  padding: 0 25px;
  margin: 0 auto;
  width: 100%;
  overflow-y: auto;
  flex: 1;
}
</style>
