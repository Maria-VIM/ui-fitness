<script setup lang="ts">
defineProps<{
  plan: any
}>()

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="plan-item">
    <div class="plan-order">
      {{ plan.orderIndex }}
    </div>
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
  gap: 12px;

  width: 100%;
  box-sizing: border-box;

  padding: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;

  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.plan-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.plan-order {
  flex-shrink: 0;

  min-width: 24px;

  font-size: 13px;
  font-weight: 600;
  color: #9ca3af;
}

.plan-content {
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;
}

.plan-title {
  font-size: 16px;
  font-weight: 500;
  color: #111827;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.plan-info {
  font-size: 14px;
  color: #6b7280;
}

.btn-group {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.edit-btn,
.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border: none;
  border-radius: 10px;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.edit-btn:hover,
.delete-btn:hover {
  transform: scale(1.05);
}

.edit-btn {
  background: #eff6ff;
}

.delete-btn {
  background: #fef2f2;
}

.edit-btn svg,
.delete-btn svg {
  width: 20px;
  height: 20px;
}

/* ========================= */
/* Планшеты */
/* ========================= */

@media (max-width: 768px) {
  .plan-item {
    padding: 12px;
    gap: 10px;
  }

  .plan-order {
    min-width: 20px;
    font-size: 12px;
  }

  .plan-title {
    font-size: 15px;
  }

  .plan-info {
    font-size: 13px;
  }

  .btn-group {
    gap: 6px;
  }

  .edit-btn,
  .delete-btn {
    width: 36px;
    height: 36px;
  }

  .edit-btn svg,
  .delete-btn svg {
    width: 18px;
    height: 18px;
  }
}

/* ========================= */
/* Телефоны */
/* ========================= */

@media (max-width: 480px) {
  .plan-item {
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 8px;
  }

  .plan-order {
    margin-top: 2px;
  }

  .plan-content {
    flex: 1;
  }

  .plan-title {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    line-height: 1.3;
  }

  .btn-group {
    width: 100%;
    justify-content: flex-end;
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px solid #f3f4f6;
  }

  .edit-btn,
  .delete-btn {
    width: 34px;
    height: 34px;
  }

  .edit-btn svg,
  .delete-btn svg {
    width: 16px;
    height: 16px;
  }
}
</style>
