<script setup lang="ts">
import WgAdminTabs from '@/modules/adminPanel/components/WgAdminTabs.vue'
import VimTitle from '@/shared/components/VimTitle.vue'
</script>

<template>
  <div class="page">
    <VimTitle title="Административная панель" />
    <WgAdminTabs />
  </div>
</template>

<style scoped>
.page {
  padding: 32px;
}
</style>
