<script setup lang="ts">
import VimMenu from '@/shared/components/VimMenu.vue'
import VimHeader from '@/shared/components/VimHeader.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isAuthRoute = computed(() => {
  return route.path.includes('auth')
})
</script>

<template>
  <div class="layout">
    <VimHeader v-if="!isAuthRoute" />
    <div class="main-content">
      <VimMenu v-if="!isAuthRoute" />
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
