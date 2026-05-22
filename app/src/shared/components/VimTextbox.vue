<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: string
  modelValue?: string | number
  label?: string
  min?: number
  max?: number
}>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const hasValue = computed(() => !!props.modelValue)
</script>

<template>
  <div class="input-wrapper">
    <input
      :id="`input-${label}`"
      class="vimBoxInput"
      :placeholder="hasValue ? '' : label"
      :type="props.type"
      :min="props.min"
      :max="props.max"
      :value="props.modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <label
      v-if="label"
      :for="`input-${label}`"
      class="floating-label"
      :class="{ 'floating-label--active': hasValue }"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
  margin: 5px 0;
}

.vimBoxInput {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.vimBoxInput:focus {
  outline: none;
  border-color: #2a9d8f;
}

.floating-label {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  padding: 0 4px;
  color: #999;
  font-size: 16px;
  pointer-events: none;
  transition: all 0.2s ease;
}

.floating-label--active {
  top: 0;
  transform: translateY(-50%);
  font-size: 12px;
  color: #2a9d8f;
}

.vimBoxInput:focus ~ .floating-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 12px;
  color: #2a9d8f;
}
</style>
