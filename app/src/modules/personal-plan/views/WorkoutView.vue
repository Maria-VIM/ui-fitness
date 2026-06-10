<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  useDeletePlan,
  usePlans,
  useUpdatePlan,
} from '@/modules/personal-plan/entites/useWorkouts.ts'

import VimTitle from '@/shared/components/VimTitle.vue'
import VimSidebar from '@/shared/components/VimSidebar.vue'

import WgPlanList from '@/modules/personal-plan/widgets/WgPlanList.vue'
import WgPlanEditor from '@/modules/personal-plan/widgets/WgPlanEditor.vue'

const route = useRoute()

const editingPlan = ref<any | null>(null)

const selectedWorkoutId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : null
})

const { data: plans } = usePlans(selectedWorkoutId.value)
const updatePlan = useUpdatePlan(selectedWorkoutId.value)
const deletePlan = useDeletePlan(selectedWorkoutId.value)

function savePlan(data: any) {
  if (!editingPlan.value) return

  updatePlan.mutate({
    id: editingPlan.value.id,
    data,
  })

  editingPlan.value = null
}

function removePlan(id: number) {
  deletePlan.mutate(id)
}
</script>

<template>
  <main class="workout-page">
    <VimTitle title="Текущая тренировка" has-button button-text="Начать" />
    <div class="plans-container">
      <WgPlanList v-if="plans" :plans="plans" @edit="editingPlan = $event" @delete="removePlan" />
    </div>
    <VimSidebar
      v-if="editingPlan"
      title="Редактирование упражнения"
      @cancel="editingPlan = null"
      @submit="$refs.editor?.submit()"
    >
      <WgPlanEditor ref="editor" v-model="editingPlan" @save="savePlan" />
    </VimSidebar>
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
