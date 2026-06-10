<script setup lang="ts">
defineProps<{
  plan: any
}>()

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="plan-item">
    <div class="plan-content">
      <div class="plan-title">
        {{ plan.title }}
      </div>

      <div class="plan-info">{{ plan.sets }} подходов × {{ plan.reps }} повторений</div>
    </div>

    <div class="btn-group">
      <button class="delete-btn" @click="emit('delete')">
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
      </button>

      <button class="edit-btn" @click="emit('edit')">
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.plan-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
}

.plan-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.plan-title {
  font-size: 16px;
  font-weight: 400;
}

.plan-info {
  font-size: 14px;
  color: #6b7280;
}

.btn-group {
  display: flex;
  gap: 8px;
}

.edit-btn,
.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.edit-btn {
  background: #eff6ff;
}

.delete-btn {
  background: #fef2f2;
}
</style>
