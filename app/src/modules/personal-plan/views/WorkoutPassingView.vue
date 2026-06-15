<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { PASSING_API } from '@/modules/personal-plan/api/passing'
import { PLANS_API } from '@/modules/personal-plan/api/plan'
import type { WorkoutSessionInterface } from '@/modules/personal-plan/interfaces/passing/workout-session.interface'
import type { WorkoutSessionStatisticInterface } from '@/modules/personal-plan/interfaces/passing/workout-session-statistics.interface'
import StaticChars from '@/modules/personal-plan/widgets/StaticChars.vue'

const baseUrl = import.meta.env.VITE_BASE_URL

const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()

const workoutId = Number(route.params.id)

const currentIndex = ref(0)
const mark = ref(5)
const isFinished = ref(false)

const { data: exercises = ref([]), isLoading: exercisesLoading } = useQuery({
  queryKey: ['workout-exercises', workoutId],
  queryFn: () => PLANS_API.getPlans(workoutId),
})

const { data: session } = useQuery<WorkoutSessionInterface>({
  queryKey: ['passing-session', workoutId],
  queryFn: () => PASSING_API.startPassing(workoutId),
})

const { data: statistics = ref<WorkoutSessionStatisticInterface[]>([]) } = useQuery({
  queryKey: ['passing-statistics'],
  queryFn: () => PASSING_API.getStatistics(),
  enabled: isFinished,
})

const currentExercise = computed(() => exercises.value?.[currentIndex.value])

const isLastExercise = computed(() => currentIndex.value === (exercises.value?.length ?? 0) - 1)

function nextExercise() {
  if (!isLastExercise.value) {
    currentIndex.value++
  }
}

const { mutate: finishWorkoutMutation, isPending: finishing } = useMutation({
  mutationFn: async () => {
    if (!session.value) return

    await PASSING_API.setMark(session.value.id, mark.value)
    await PASSING_API.endPassing(workoutId)
  },

  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ['passing-statistics'],
    })

    isFinished.value = true
  },

  onError: (error) => {
    console.error(error)
  },
})

function finishWorkout() {
  finishWorkoutMutation()
}

function goBack() {
  router.push('/personal')
}
</script>

<template>
  <div v-if="exercisesLoading" class="loading">Загрузка тренировки...</div>

  <div v-else-if="!isFinished && currentExercise" class="exercise-view">
    <div class="exercise-content">
      <div class="exercise-meta">
        <span class="meta-item"> ⏱ {{ currentExercise.during }} мин </span>
        <span class="meta-item"> 🔁 {{ currentExercise.sets }} подходов </span>
        <span class="meta-item"> 🎯 {{ currentExercise.reps }} повторений </span>
      </div>
      <h1 class="exercise-title">
        {{ currentExercise.title }}
      </h1>

      <div class="exercise-text">
        {{ currentExercise.content }}
      </div>
      <div v-if="currentExercise.imagePath" class="exercise-cover">
        <img
          :src="`${baseUrl}/uploads/exercises/${currentExercise.imagePath}`"
          :alt="currentExercise.title"
        />
      </div>
      <div class="actions">
        <button v-if="!isLastExercise" class="btn" @click="nextExercise">
          Следующее упражнение
        </button>

        <div v-else class="finish-block">
          <label>Оцените тренировку</label>
          <input v-model="mark" type="range" min="1" max="10" />
          <div>Оценка: {{ mark }}</div>
          <button class="btn" :disabled="finishing" @click="finishWorkout">
            {{ finishing ? 'Завершение...' : 'Завершить тренировку' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="isFinished" class="stats-page">
    <h2>Тренировка завершена 🎉</h2>
    <StaticChars v-if="statistics?.length" :statistics="statistics" />
    <button class="btn" @click="goBack">Вернуться к тренировкам</button>
  </div>
</template>

<style scoped>
.exercise-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.exercise-content,
.stats-page {
  background: white;
  border: 1px solid #e7ece7;
  border-radius: 20px;
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
  font-weight: 500;
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

.actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #eef2ee;
}

.btn {
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  background: #71966d;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover:not(:disabled) {
  opacity: 0.9;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.finish-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.finish-block label {
  color: #1f3c58;
  font-weight: 600;
}

.finish-block input[type='range'] {
  width: 100%;
}

.stats-page {
  text-align: center;
}

.stats-page h2 {
  margin: 0 0 24px;
  color: #1f3c58;
}

.loading {
  background: white;
  border: 1px solid #e7ece7;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  color: #6b7280;
}

@media (max-width: 768px) {
  .exercise-content,
  .stats-page {
    padding: 20px;
  }

  .exercise-title {
    font-size: 24px;
  }

  .actions {
    margin-top: 24px;
    margin-bottom: 60px;
    padding-top: 20px;
  }

  .btn {
    width: 100%;
  }
}
</style>
