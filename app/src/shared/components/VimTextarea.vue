<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string | number
  label?: string
  rows?: number
  minLength?: number
  maxLength?: number
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const hasValue = computed(() => !!props.modelValue)
</script>

<template>
  <div class="textarea-wrapper">
    <textarea
      :id="`textarea-${label}`"
      class="vimBoxTextarea"
      :placeholder="hasValue ? '' : label"
      :rows="rows ?? 2"
      :minlength="minLength"
      :maxlength="maxLength"
      :value="props.modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />

    <label
      v-if="label"
      :for="`textarea-${label}`"
      class="floating-label"
      :class="{ 'floating-label--active': hasValue }"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.textarea-wrapper {
  position: relative;
  width: 100%;
  margin: 5px 0;
}

.vimBoxTextarea {
  width: 100%;
  min-height: 80px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  transition: all 0.2s ease;
  font-family: inherit;
}

.vimBoxTextarea:focus {
  outline: none;
  border-color: #2a9d8f;
}

.floating-label {
  position: absolute;
  left: 10px;
  top: 16px;
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
  border: 1px solid #2a9d8f;
  border-radius: 4px;
  width: 30%;
  font-size: 12px;
  color: #2a9d8f;
}

.vimBoxTextarea:focus ~ .floating-label {
  top: 0;
  transform: translateY(-50%);
  border: 1px solid #2a9d8f;
  border-radius: 4px;
  width: 30%;
  font-size: 12px;
  color: #2a9d8f;
}
</style>
