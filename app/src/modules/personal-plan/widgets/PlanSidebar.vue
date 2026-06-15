<script setup lang="ts">
import type { PlanInterface } from '@/modules/personal-plan/interfaces/plans/plan.interface.ts'
import VimSidebar from '@/shared/components/VimSidebar.vue'
import VimTextbox from '@/shared/components/VimTextbox.vue'
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { PLANS_API } from '@/modules/personal-plan/api/plan.ts'

const props = defineProps<{ plan: PlanInterface; total: number }>()
const emits = defineEmits(['update:plan', 'cancel'])

const currentReps = ref<number>(props.plan.reps)
const currentSets = ref<number>(props.plan.sets)
const currentOrderIndex = ref<number>(props.plan.orderIndex)

const { mutate: updateItem } = useMutation({
  mutationFn: ({
    planId,
    orderIndex,
    sets,
    reps,
  }: {
    planId: number
    orderIndex: number
    sets: number
    reps: number
  }) => {
    return PLANS_API.updatePlan(planId, {
      orderIndex,
      sets,
      reps,
    })
  },
  onSuccess: () => {
    emits('update:plan')
  },
})
</script>

<template>
  <VimSidebar
    title="Изменить упражнение"
    @submit="
      updateItem({
        planId: Number(plan.id),
        orderIndex: Number(currentOrderIndex),
        sets: Number(currentSets),
        reps: Number(currentReps),
      })
    "
    @cancel="emits('cancel')"
  >
    <VimTextbox type="text" v-model="plan.title" :disabled="true" />
    <VimTextbox type="number" v-model="currentSets" label="Подходы" />
    <VimTextbox type="number" v-model="currentReps" label="Повторений" />
    <VimTextbox type="number" v-model="currentOrderIndex" label="Порядок" :max="total" :min="1" />
    <p>* Не больше {{ total }}</p>
  </VimSidebar>
</template>

<style scoped></style>
