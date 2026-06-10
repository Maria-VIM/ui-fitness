<script setup lang="ts">
import VimTitle from '@/shared/components/VimTitle.vue'
import WgPersonalTable from '@/modules/personal-plan/widgets/WgPersonalTable.vue'
import WgPersonalPlanModal from '@/modules/personal-plan/widgets/WgPersonalPlanModal.vue'
import { ref } from 'vue'

const isNewModal = ref(false)
function closeModalSidebar() {
  isNewModal.value = false
}
</script>

<template>
  <div class="page">
    <VimTitle
      title="Личный план"
      :has-button="true"
      button-text="Добавить"
      @btn-click="isNewModal = true"
    />
    <WgPersonalPlanModal
      :view="isNewModal"
      @cancel="isNewModal = false"
      @close="closeModalSidebar"
    />
    <WgPersonalTable />
  </div>
</template>

<style scoped></style>
