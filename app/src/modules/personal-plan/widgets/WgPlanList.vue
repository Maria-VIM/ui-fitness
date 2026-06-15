<script setup lang="ts">
import { computed, ref } from 'vue'
import PlanItem from './PlanItem.vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { workoutKeys } from '@/modules/personal-plan/entites/queryKeys.ts'
import { PLANS_API } from '@/modules/personal-plan/api/plan.ts'
import { useRoute } from 'vue-router'
import type { PlanInterface } from '@/modules/personal-plan/interfaces/plans/plan.interface.ts'
import VimModalDrawer from '@/shared/components/VimModalDrawer.vue'
import PlanSidebar from '@/modules/personal-plan/widgets/PlanSidebar.vue'

const route = useRoute()
const queryClient = useQueryClient()

const id = computed(() => Number(route.params.id))
const selectedId = ref<number>(0)

const selectedPlan = ref<any | PlanInterface>(null)

const viewDeleteModal = ref<boolean>(false)
const deleteText = ref<string>('')
const deleteTitle = ref<string>('')

const viewEditModal = ref<boolean>(false)

const resetDragState = () => {
  dragStartIndex.value = null
  dragOverIndex.value = null
  selectedPlan.value = null
}

function openDeleteModal(plan: PlanInterface) {
  viewDeleteModal.value = true
  deleteTitle.value = `Удалить упражнение из плана`
  deleteText.value = `Удалить упражнение из плана, которое является ${plan.orderIndex} по порядку. Добавить его обратно можно будет через библиотеку"`
  selectedId.value = plan.id
}

function openEditModal(plan: PlanInterface) {
  viewEditModal.value = true
  selectedPlan.value = plan
}

function cancelEditModal() {
  viewEditModal.value = false
}

function updateEditModal() {
  viewEditModal.value = false
  queryClient.invalidateQueries({
    queryKey: workoutKeys.plans(id.value),
  })
}

const plansCount = computed(() => plansData.value?.length ?? 0)

const { data: plansData } = useQuery({
  queryKey: workoutKeys.plans(id.value),
  queryFn: () => PLANS_API.getPlans(id.value),
  enabled: !!id.value,
})

const { mutate: updatePlanOrderItem } = useMutation({
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
    queryClient.invalidateQueries({
      queryKey: workoutKeys.plans(id.value),
    })
  },
})

const { mutate: deleteItemPlan } = useMutation({
  mutationFn: () => PLANS_API.deletePlan(selectedId.value),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: workoutKeys.plans(id.value),
    })
    viewDeleteModal.value = false
  },
})

const dragStartIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

const handleDragStart = (plan: PlanInterface, index: number) => {
  selectedPlan.value = plan
  dragStartIndex.value = index
}

const handleDragOver = (index: number) => {
  dragOverIndex.value = index
}

const handleDrop = (dropIndex: number) => {
  if (dragStartIndex.value !== null && selectedPlan.value && dragStartIndex.value !== dropIndex) {
    updatePlanOrderItem({
      planId: selectedPlan.value.id,
      orderIndex: dropIndex + 1,
      sets: selectedPlan.value.sets,
      reps: selectedPlan.value.reps,
    })
    resetDragState()
  }
  dragStartIndex.value = null
  dragOverIndex.value = null
  selectedPlan.value = null
}
</script>

<template>
  <PlanSidebar
    v-if="viewEditModal"
    :plan="selectedPlan"
    :total="plansCount"
    @cancel="cancelEditModal"
    @update:plan="updateEditModal"
  />
  <VimModalDrawer
    v-if="viewDeleteModal"
    :title="deleteTitle"
    :description="deleteText"
    submit-text="Продолжить"
    @cancel="viewDeleteModal = false"
    @submit="deleteItemPlan()"
  />
  <div class="plan-list">
    <div
      v-for="(plan, index) in plansData"
      :key="plan.id"
      class="plan-wrapper"
      :class="{
        dragging: dragStartIndex === index,
        'drag-over': dragOverIndex === index,
      }"
      @dragover.prevent="handleDragOver(index)"
      @drop="handleDrop(index)"
    >
      <PlanItem
        :plan="plan"
        draggable="true"
        @dragend="resetDragState"
        @dragstart="handleDragStart(plan, index)"
        @delete="openDeleteModal(plan)"
        @edit="openEditModal(plan)"
      />
    </div>
  </div>
</template>

<style scoped>
.plan-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-wrapper {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    box-shadow 0.2s ease;
}

.plan-wrapper.dragging {
  opacity: 0.5;
}

.plan-wrapper.drag-over {
  transform: translateY(-10px);
}
</style>
