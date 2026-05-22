<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import VimTitle from '@/shared/components/VimTitle.vue'
import { useQuery } from '@tanstack/vue-query'
import { GROUP_API } from '@/modules/library/api/groups.ts'
import { CATEGORY_API } from '@/modules/library/api/categories.ts'
import { EXERCISE_API } from '@/modules/library/api/exercises.ts'

const selectedGroupId = ref<number | null>(null)
const selectedCategoryId = ref<number | null>(null)

const baseUrl = import.meta.env.VITE_BASE_URL

const { data: groupData } = useQuery({
  queryKey: ['groups'],
  queryFn: () => GROUP_API.get(),
})

const { data: categoryData } = useQuery({
  queryKey: ['categories', selectedGroupId],
  queryFn: () => CATEGORY_API.get(selectedGroupId.value!),
  enabled: computed(() => !!selectedGroupId.value),
})

const { data: exercisesData } = useQuery({
  queryKey: ['exercises', selectedCategoryId],
  queryFn: () => {
    return EXERCISE_API.get(selectedCategoryId.value ?? undefined)
  },
})

watch(selectedCategoryId, (value) => {
  selectedCategoryId.value = value ? Number(value) : null
})
</script>
<template>
  <div class="page">
    <VimTitle title="Библиотека упражнений" />

    <div class="filters">
      <select v-model="selectedGroupId" class="filter-select" @change="selectedCategoryId = null">
        <option :value="null">Группа упражнений</option>

        <option v-for="group in groupData ?? []" :key="group.id" :value="group.id">
          {{ group.name }}
        </option>
      </select>

      <select v-model="selectedCategoryId" class="filter-select" :disabled="!selectedGroupId">
        <option :value="null">Категория упражнений</option>

        <option v-for="category in categoryData ?? []" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="exercises-grid">
      <div v-for="exercise in exercisesData ?? []" :key="exercise.id" class="exercise-card">
        <div class="exercise-image">
          <img
            v-if="exercise.imagePath"
            :src="`${baseUrl}/uploads/exercises/${exercise.imagePath}`"
            :alt="exercise.title"
          />
        </div>

        <div class="exercise-body">
          <div class="exercise-badges">
            <span v-for="category in exercise.categories" :key="category" class="exercise-badge">
              {{ category }}
            </span>
          </div>
          <h3 class="exercise-title">
            {{ exercise.title }}
          </h3>

          <p class="exercise-description">
            {{ exercise.content }}
          </p>
        </div>
        <div class="exercise-actions">
          <button class="edit-btn" style="width: 50%; gap: 10px">
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
                stroke-width="2"
                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
              />
              <path
                stroke="currentColor"
                stroke-width="2"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Просмотр
          </button>
          <button class="edit-btn" style="width: 50%; gap: 10px">
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
                d="M5 12h14m-7 7V5"
              />
            </svg>
            Добавить
          </button>
        </div>
      </div>
    </div>

    <div v-if="!exercisesData?.length" class="empty">Упражнения не найдены</div>
  </div>
</template>

<style scoped></style>
