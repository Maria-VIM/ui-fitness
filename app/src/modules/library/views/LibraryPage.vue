<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'

import VimTitle from '@/shared/components/VimTitle.vue'
import { GROUP_API } from '@/modules/library/api/groups'
import { CATEGORY_API } from '@/modules/library/api/categories'
import { EXERCISE_API } from '@/modules/library/api/exercises'

const LIMIT = 8

const router = useRouter()
const baseUrl = import.meta.env.VITE_BASE_URL

const selectedGroupId = ref<number | null>(null)
const selectedCategoryId = ref<number | null>(null)

const loadMoreRef = ref<HTMLElement | null>(null)

const { data: groupData } = useQuery({
  queryKey: ['groups'],
  queryFn: GROUP_API.get,
})

const { data: categoryData } = useQuery({
  queryKey: computed(() => ['categories', selectedGroupId.value]),
  queryFn: () => CATEGORY_API.get(selectedGroupId.value!),
  enabled: computed(() => selectedGroupId.value !== null),
})

const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
  queryKey: computed(() => ['exercises', selectedCategoryId.value]),
  initialPageParam: 0,
  queryFn: ({ pageParam }) =>
    EXERCISE_API.get(LIMIT, pageParam, selectedCategoryId.value ?? undefined),

  getNextPageParam: (lastPage, allPages) => {
    if (!lastPage?.length || lastPage?.length < LIMIT) {
      return undefined
    }

    return allPages.reduce((acc, page) => acc + page?.length, 0)
  },
})

const exercisesData = computed(() => data.value?.pages.flatMap((page) => page) ?? [])

watch(selectedGroupId, () => {
  selectedCategoryId.value = null
})

let observer: IntersectionObserver | null = null

watch(
  loadMoreRef,
  (element) => {
    observer?.disconnect()

    if (!element) return

    observer = new IntersectionObserver(
      async ([entry]: any) => {
        if (!entry.isIntersecting || !hasNextPage.value || isFetchingNextPage.value) {
          return
        }

        await fetchNextPage()
      },
      {
        rootMargin: '300px',
      },
    )

    observer.observe(element)
  },
  {
    immediate: true,
  },
)

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="page">
    <VimTitle title="Библиотека упражнений" />

    <div class="filters">
      <select v-model="selectedGroupId" class="filter-select">
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

    <div v-if="isLoading" class="empty">Загрузка...</div>

    <div v-else-if="!exercisesData?.length" class="empty">Упражнения не найдены</div>

    <div v-else class="exercises-grid">
      <div v-for="exercise in exercisesData" :key="exercise.id" class="exercise-card">
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
          <button
            class="edit-btn"
            style="width: 50%; gap: 10px"
            @click="router.push(`/library/exercise/${exercise.id}`)"
          >
            Просмотр
          </button>
          <button class="edit-btn" style="width: 50%; gap: 10px">Добавить</button>
        </div>
      </div>
    </div>

    <div ref="loadMoreRef" style="height: 50px">
      <span v-if="isFetchingNextPage"> Загрузка... </span>
    </div>
  </div>
</template>
