<script setup lang="ts">
import VimTitle from '@/shared/components/VimTitle.vue'
import WgPlanList from '@/modules/personal-plan/widgets/WgPlanList.vue'
import { PASSING_API } from '@/modules/personal-plan/api/passing.ts'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

async function startWorkout() {
  await PASSING_API.startPassing(Number(route.params.id))
  await router.push({
    name: 'oneWorkoutPassing',
    params: {
      id: Number(route.params.id),
    },
  })
}
</script>

<template>
  <main class="workout-page">
    <VimTitle
      title="Текущая тренировка"
      has-button
      button-text="Начать"
      @btn-click="startWorkout"
    />
    <WgPlanList class="plans-container" />
  </main>
</template>

<style scoped>
.workout-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.plans-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
