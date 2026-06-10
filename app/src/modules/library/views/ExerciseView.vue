<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'

import VimTitle from '@/shared/components/VimTitle.vue'
import { EXERCISE_API } from '@/modules/library/api/exercises'

const route = useRoute()
const baseUrl = import.meta.env.VITE_BASE_URL
const exerciseId = computed(() => Number(route.params.id))
const { data: exercise, isLoading } = useQuery({
  queryKey: ['exercise', exerciseId],
  queryFn: () => EXERCISE_API.getOne(exerciseId.value),
})
</script>

<template>
  <div class="exercise-view">
    <div class="exercise-content">
      <div class="exercise-meta">
        <span class="meta-item">⏱ {{ exercise.during }} мин.</span>
        <span class="meta-item">
          📅 {{ new Date(exercise.createdAt).toLocaleDateString('ru-RU') }}
        </span>
      </div>

      <h1 class="exercise-title">
        {{ exercise.title }}
      </h1>

      <div class="exercise-text">
        {{ exercise.content }}
      </div>
    </div>

    <div v-if="exercise.imagePath" class="exercise-cover">
      <img :src="`${baseUrl}/uploads/exercises/${exercise.imagePath}`" :alt="exercise.title" />
    </div>
  </div>
</template>

<style scoped>
.exercise-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.exercise-cover {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e7ece7;
  background: white;
}

.exercise-cover img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  display: block;
}

.exercise-content {
  background: white;
  border: 1px solid #e7ece7;
  border-radius: 20px;
  margin: 10px 0;
  padding: 32px;
}

.exercise-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.meta-item {
  background: #edf5ea;
  color: #71966d;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 14px;
}

.exercise-title {
  margin: 0 0 24px;
  font-size: 32px;
  line-height: 1.2;
  color: #1f3c58;
}

.exercise-text {
  white-space: pre-line;
  line-height: 1.8;
  color: #4b5563;
  font-size: 16px;
}

.loading {
  padding: 40px;
  text-align: center;
}

@media (max-width: 768px) {
  .exercise-content {
    padding: 20px;
  }

  .exercise-title {
    font-size: 24px;
  }

  .exercise-cover img {
    max-height: 280px;
  }
}
</style>
