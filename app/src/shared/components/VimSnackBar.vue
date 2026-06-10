<script setup lang="ts">
defineProps<{ title: string; type?: 'default' | 'error' | 'success' | 'warning' }>()
const emits = defineEmits(['close'])
</script>

<template>
  <div @click="emits('close')" class="snack" :class="`snack--${type || 'default'}`">
    <p>{{ title }}</p>
  </div>
</template>

<style scoped>
.snack {
  position: fixed;
  padding: 20px;
  width: 300px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  border: 1px solid #c6c6c6;
}

.snack--default {
  background: white;
  border-left: 4px solid #9ca3af;
  color: #1f2937;
}

.snack--error {
  background: white;
  border-left: 4px solid #dc2626;
  color: #991b1b;
}

.snack--success {
  background: white;
  border-left: 4px solid #16a34a;
  color: #14532d;
}

.snack--warning {
  background: white;
  border-left: 4px solid #f59e0b;
  color: #92400e;
}
</style>
