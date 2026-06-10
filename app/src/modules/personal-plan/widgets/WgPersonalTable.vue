<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import WORKOUTS_API from '@/modules/personal-plan/api/workouts.ts'
import { ref } from 'vue'
import VimModalDrawer from '@/shared/components/VimModalDrawer.vue'
import router from '@/router'

const isOpenDeleteModal = ref(false)
const selectedId = ref<number>(1)
const selectedName = ref<string>('')

const weekDaysMap: Record<string, string> = {
  monday: 'Пн',
  tuesday: 'Вт',
  wednesday: 'Ср',
  thursday: 'Чт',
  friday: 'Пт',
  saturday: 'Сб',
  sunday: 'Вс',
}

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const today = new Date()
const dayName = days[today.getDay()]

const formatDays = (days: string | null) => {
  if (!days) return '-'
  return days
    .replace(/[{}]/g, '')
    .split(',')
    .map((day) => weekDaysMap[day] || day)
    .join(', ')
}

function openDeleteModal(id: number, name: string) {
  isOpenDeleteModal.value = true
  selectedId.value = id
  selectedName.value = name
}

function deleteWorkoutModal() {
  deleteWorkout(selectedId.value)
  isOpenDeleteModal.value = false
}

const queryClient = useQueryClient()

const { data: workoutData } = useQuery({
  queryKey: ['workout'],
  queryFn: async () => await WORKOUTS_API.get(),
})

const { mutate: deleteWorkout } = useMutation({
  mutationFn: (id: number) => WORKOUTS_API.delete(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['workout'] })
  },
  onError: (error) => {
    console.error(error)
  },
})
</script>

<template>
  <div class="group-list">
    <VimModalDrawer
      v-if="isOpenDeleteModal"
      title="Удалить персональный план"
      :description="`Удалить персональный план тренировки '${selectedName}'. При удалении история тренировок сохраняется`"
      submit-text="Продолжить"
      @submit="deleteWorkoutModal"
      @cancel="isOpenDeleteModal = false"
    />
    <div v-for="workout in workoutData" :key="workout.id" class="group-item">
      <div class="group-name">
        <p class="title">{{ workout.title }}</p>
        <span>Дни недели: </span>
        <span class="day-badge">{{ formatDays(workout.daysOfWeek) }}</span>
      </div>
      <div class="btn-groups">
        <button
          class="action-btn"
          :class="{
            disabled: !(workout.daysOfWeek ?? '').includes(dayName),
          }"
          :disabled="!(workout.daysOfWeek ?? '').includes(dayName)"
          @click="router.push(`workout/${workout.id}`)"
        >
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
              d="M8 18V6l8 6-8 6Z"
            />
          </svg>
        </button>
        <button class="edit-btn">
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
        <button class="delete-btn" @click="openDeleteModal(workout.id, workout.title)">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 20px;
  margin: 10px 0;
}
.day-badge {
  padding: 2px 8px;
  border-radius: 12px;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 12px;
  font-weight: 500;
}
</style>
