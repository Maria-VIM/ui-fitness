<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{
  modelValue: any | null
}>()

const emit = defineEmits(['save', 'close'])

const form = reactive({
  sets: 0,
  reps: 0,
})

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      form.sets = val.sets
      form.reps = val.reps
    }
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="modelValue" class="modal">
    <h3>Edit plan</h3>

    <input v-model.number="form.sets" placeholder="sets" />
    <input v-model.number="form.reps" placeholder="reps" />

    <button @click="emit('save', form)">Save</button>
    <button @click="emit('close')">Close</button>
  </div>
</template>
