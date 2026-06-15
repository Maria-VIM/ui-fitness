<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: string
  isInvalid?: boolean
  modelValue?: string | number
  label?: string
  min?: number
  max?: number
  disabled?: boolean
}>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputId = computed(() => `input-${(props.label ?? '').replace(/\s+/g, '-').toLowerCase()}`)
const hasValue = computed(() => !!props.modelValue)
</script>

<template>
  <div class="input-wrapper">
    <input
      :id="inputId"
      class="vimBoxInput"
      :placeholder="hasValue ? '' : label"
      :type="props.type"
      :min="props.min"
      :max="props.max"
      :value="props.modelValue"
      :class="{ 'vimBoxInput--invalid': isInvalid }"
      :disabled="disabled"
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
  height: 48px;
  padding: 14px 12px;
  box-sizing: border-box;

  border: 1px solid #ccc;
  border-radius: 4px;

  font-size: 16px;
  line-height: 1.2;

  background-color: #fff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.vimBoxInput:focus {
  outline: none;
  border-color: #2a9d8f;
}

.vimBoxInput:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.floating-label {
  position: absolute;

  left: 12px;
  top: 50%;

  transform: translateY(-50%);

  padding: 0 4px;
  background: #fff;

  color: #999;
  font-size: 16px;
  line-height: 1;

  pointer-events: none;

  max-width: calc(100% - 24px);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  transition:
    top 0.2s ease,
    transform 0.2s ease,
    font-size 0.2s ease,
    color 0.2s ease;
}

.floating-label--active,
.vimBoxInput:focus ~ .floating-label {
  top: 0;
  transform: translateY(-50%);

  font-size: 12px;
  color: #2a9d8f;

  border: 1px solid #2a9d8f;
  border-radius: 4px;

  width: fit-content;
  max-width: 90%;
}

.vimBoxInput--invalid {
  border-color: #dc2626;
}

.vimBoxInput--invalid:focus {
  border-color: #b91c1c;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}

.vimBoxInput--invalid ~ .floating-label {
  color: #dc2626;
}

.vimBoxInput--invalid:focus ~ .floating-label,
.vimBoxInput--invalid + .floating-label.floating-label--active {
  color: #dc2626;
  border-color: #dc2626;
}

@media (max-width: 768px) {
  .input-wrapper {
    margin: 4px 0;
  }

  .vimBoxInput {
    height: 44px;
    padding: 12px 10px;
    font-size: 14px;
  }

  .floating-label {
    left: 10px;
    font-size: 14px;
    max-width: calc(100% - 20px);
  }

  .floating-label--active,
  .vimBoxInput:focus ~ .floating-label {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .vimBoxInput {
    height: 42px;
    padding: 10px;
    font-size: 14px;
  }

  .floating-label {
    font-size: 13px;
  }

  .floating-label--active,
  .vimBoxInput:focus ~ .floating-label {
    font-size: 10px;
  }
}
</style>
