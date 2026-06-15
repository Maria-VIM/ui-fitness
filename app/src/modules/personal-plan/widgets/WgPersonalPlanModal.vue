<script setup lang="ts">
import VimSidebar from '@/shared/components/VimSidebar.vue'
import VimTextbox from '@/shared/components/VimTextbox.vue'
import { ref } from 'vue'
import type { WorkoutFormInterface } from '@/modules/personal-plan/interfaces/workouts/workout-form.interface.ts'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import WORKOUTS_API from '@/modules/personal-plan/api/workouts.ts'
import type { DaysOfWeek } from '@/shared/enums/daysOfWeek.enum.ts'

const queryClient = useQueryClient()

const creationMode = ref<'manual' | 'generated'>('manual')

defineProps<{ view: boolean; id?: number }>()
const emits = defineEmits(['close'])

const days = [
  { short: 'Пн', full: 'Понедельник', value: 'monday' },
  { short: 'Вт', full: 'Вторник', value: 'tuesday' },
  { short: 'Ср', full: 'Среда', value: 'wednesday' },
  { short: 'Чт', full: 'Четверг', value: 'thursday' },
  { short: 'Пт', full: 'Пятница', value: 'friday' },
  { short: 'Сб', full: 'Суббота', value: 'saturday' },
  { short: 'Вс', full: 'Воскресенье', value: 'sunday' },
]

const form = ref<WorkoutFormInterface>({
  title: '',
  daysOfWeek: [],
})

import { useQuery } from '@tanstack/vue-query'
import { CATEGORY_API } from '@/modules/library/api/categories.ts'

const selectedCategories = ref<number[]>([])
const { data: categories } = useQuery({
  queryKey: ['categories'],
  queryFn: () => CATEGORY_API.get(),
})

const { mutate: generateWorkout } = useMutation({
  mutationFn: () =>
    WORKOUTS_API.createGenerated({
      title: form.value.title,
      daysOfWeek: form.value.daysOfWeek,
      categoryIds: selectedCategories.value,
    }),
  onSuccess: () => {
    emits('close')
    queryClient.invalidateQueries({ queryKey: ['workout'] })
  },
})

const { mutate: createWorkout } = useMutation({
  mutationFn: async () => await WORKOUTS_API.create(form.value),
  onSuccess: () => {
    emits('close')
    queryClient.invalidateQueries({ queryKey: ['workout'] })
  },
})

function handleCreateWorkout() {
  if (creationMode.value === 'manual') {
    createWorkout()
  } else {
    generateWorkout()
  }
}
</script>

<template>
  <VimSidebar
    v-if="view"
    :title="id ? 'Изменить план тренировки' : 'Добавить план тренировки'"
    @submit="handleCreateWorkout()"
  >
    <div class="mode-selector">
      <label class="mode-card" :class="{ 'mode-card--active': creationMode === 'manual' }">
        <input v-model="creationMode" type="radio" value="manual" />
        <div class="mode-card__title">Самостоятельно</div>
        <div class="mode-card__description">Создать программу вручную</div>
      </label>

      <label class="mode-card" :class="{ 'mode-card--active': creationMode === 'generated' }">
        <input v-model="creationMode" type="radio" value="generated" />
        <div class="mode-card__title">Сгенерировать</div>
        <div class="mode-card__description">Подобрать программу автоматически</div>
      </label>
    </div>
    <VimTextbox type="text" label="Название" v-model="form.title" />
    <div class="days">
      <label class="days__title">Дни тренировок</label>
      <div class="days__grid">
        <label
          v-for="day in days"
          :key="day.full"
          class="day-chip"
          :class="{ 'day-chip--active': form.daysOfWeek.includes(day.value as DaysOfWeek) }"
        >
          <input v-model="form.daysOfWeek" type="checkbox" :value="day.value" />
          <span>{{ day.short }}</span>
        </label>
      </div>
    </div>
    <div class="categories" v-if="creationMode !== 'manual'">
      <label class="categories__title">Категории тренировок</label>

      <div class="categories-grid">
        <label
          v-for="category in categories"
          :key="category.id"
          class="category-chip"
          :class="{
            'category-chip--active': selectedCategories.includes(category.id),
          }"
        >
          <input v-model="selectedCategories" type="checkbox" :value="category.id" />
          <span>{{ category.name }}</span>
        </label>
      </div>
    </div>
  </VimSidebar>
</template>

<style scoped>
.days {
  margin-top: 20px;
}

.days__title {
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
}

.days__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.day-chip {
  position: relative;
  height: 44px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: center;
}

.day-chip:hover {
  border-color: #85b180;
  transform: translateY(-1px);
}

.day-chip input {
  display: none;
}

.day-chip span {
  font-weight: 600;
  font-size: 14px;
}

.day-chip--active {
  background: #85b180;
  border-color: #85b180;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
}

.mode-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.mode-card {
  position: relative;
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mode-card:hover {
  transform: translateY(-2px);
  border-color: #85b180;
}

.mode-card input {
  display: none;
}

.mode-card__icon {
  font-size: 28px;
}

.mode-card__title {
  font-size: 15px;
  font-weight: 700;
}

.mode-card__description {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
}

.mode-card--active {
  border-color: #85b180;
  background: #f5faf5;
  box-shadow: 0 4px 12px rgba(133, 177, 128, 0.2);
}

.categories {
  margin-top: 20px;
}

.categories__title {
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
}

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-chip {
  position: relative;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.category-chip:hover {
  border-color: #85b180;
}

.category-chip input {
  display: none;
}

.category-chip span {
  font-size: 14px;
  font-weight: 600;
}

.category-chip--active {
  background: #85b180;
  border-color: #85b180;
  color: white;
  box-shadow: 0 4px 10px rgba(133, 177, 128, 0.25);
}
</style>
