<script setup lang="ts">
import PlanItem from './PlanItem.vue'

defineProps<{
  plans: any[]
}>()

const emit = defineEmits<{
  (e: 'edit', plan: any): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="plan-list">
    <PlanItem
      v-for="plan in plans"
      :key="plan.id"
      :plan="plan"
      @edit="emit('edit', plan)"
      @delete="emit('delete', plan.id)"
    />
  </div>
</template>

<style scoped>
.plan-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
