<script setup lang="ts">
defineProps<{text?: string, disabled?: boolean}>()
</script>

<template>
  <input
    type="button"
    :value="text"
    :disabled="disabled"
  >
</template>

<style scoped>
input[type="button"] {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  background: #E76F51;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

input[type="button"]:hover:not(:disabled) {
  background: #F4A261;
}

input[type="button"]:active:not(:disabled) {
  transform: scale(0.98);
}

input[type="button"]:disabled {
  background: #6C7A7A;
  cursor: not-allowed;
  opacity: 0.5;
}

input[type="button"]:focus-visible {
  outline: 2px solid #2A9D8F;
  outline-offset: 2px;
}

@media (max-width: 768px) {
  input[type="button"] {
    padding: 0.625rem 1.25rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  input[type="button"] {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}
</style>
