<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { GROUP_API } from '@/modules/adminPanel/api/groups.ts'
import { CATEGORY_API } from '@/modules/adminPanel/api/categories.ts'
import { EXERCISE_API } from '@/modules/adminPanel/api/exercises.ts'
import VimModalDrawer from '@/shared/components/VimModalDrawer.vue'
import VimButton from '@/shared/components/VimButton.vue'
import type { ExerciseFormInterface } from '@/modules/adminPanel/interfaces/exercises/exercise-form.interface.ts'
import VimSidebar from '@/shared/components/VimSidebar.vue'
import VimTextbox from '@/shared/components/VimTextbox.vue'
import type { CategoryInterface } from '@/modules/adminPanel/interfaces/categories/category.interface.ts'
import VimTextarea from '@/shared/components/VimTextarea.vue'

const queryClient = useQueryClient()

const selectedGroupId = ref<number | null>(null)
const selectedCategoryId = ref<number | null>(null)

const selectedExercisesId = ref<number>(0)

const isShowSidebar = ref<boolean>(false)
const isShowDeleteModal = ref<boolean>(false)

const defaultFormData: ExerciseFormInterface = {
  title: '',
  imagePath: '',
  content: '',
  during: 0,
}

const file = ref(null)

const selectedIdsTag = ref<number[]>([])

const formData = ref<ExerciseFormInterface>({ ...defaultFormData })

const baseUrl = import.meta.env.VITE_BASE_URL

function tag(categoryId: number | string) {
  const id = Number(categoryId)
  const index = selectedIdsTag.value.findIndex((i) => i === id)
  if (index === -1) {
    selectedIdsTag.value.push(id)
  } else {
    selectedIdsTag.value.splice(index, 1)
  }
}

function openModal(id: number) {
  isShowDeleteModal.value = true
  selectedExercisesId.value = id
}

function openSidebar(id?: number) {
  isShowSidebar.value = true
  if (id !== undefined) {
    selectedExercisesId.value = id
  }
}

function closeModal() {
  queryClient.invalidateQueries({ queryKey: ['exercises', selectedCategoryId] })
  selectedExercisesId.value = 0
  isShowDeleteModal.value = false
}

function closeSidebar() {
  queryClient.invalidateQueries({ queryKey: ['exercises', selectedCategoryId] })
  selectedExercisesId.value = 0
  selectedIdsTag.value = []
  file.value = null
  formData.value = { ...defaultFormData }
  isShowSidebar.value = false
}

async function handleUpdateOrCreate() {
  if (file.value) {
    const imageFormData = new FormData()
    imageFormData.append('file', file.value)
    formData.value.imagePath = await EXERCISE_API.uploadImage(imageFormData)
  }
  if (selectedExercisesId.value === 0) {
    createExercise()
  } else {
    updateExercise(selectedExercisesId.value)
  }
}

const expandedGroups = ref<Set<number>>(new Set())
function toggleGroup(groupId: number) {
  const set = expandedGroups.value
  if (set.has(groupId)) {
    set.delete(groupId)
  } else {
    set.add(groupId)
  }
  expandedGroups.value = new Set(set)
}

const groupedTags = computed(() => {
  if (!groupsTagData.value || !categoriesTagData.value) return []
  return groupsTagData.value.map((group) => {
    return {
      ...group,
      categories: categoriesTagData.value.filter(
        (category: CategoryInterface) => category.groupId === group.id,
      ),
    }
  })
})

const onFileChange = (e) => {
  file.value = e.target.files[0]
}

const { data: groupData } = useQuery({
  queryKey: ['groups'],
  queryFn: () => GROUP_API.get(),
})

const { data: categoryData } = useQuery({
  queryKey: ['categories', selectedGroupId],
  queryFn: () => CATEGORY_API.get(selectedGroupId.value!),
  enabled: computed(() => !!selectedGroupId.value),
})

const { data: groupsTagData } = useQuery({
  queryKey: ['groups'],
  queryFn: () => {
    return GROUP_API.get()
  },
})

const { data: categoriesTagData } = useQuery({
  queryKey: ['categories'],
  queryFn: () => {
    return CATEGORY_API.get()
  },
})

const { data: exercisesData } = useQuery({
  queryKey: ['exercises', selectedCategoryId],
  queryFn: () => {
    return EXERCISE_API.get(selectedCategoryId.value ?? undefined)
  },
})

const { data: exerciseOneData } = useQuery({
  queryKey: ['exercises', 'all', selectedExercisesId],
  queryFn: () => {
    return EXERCISE_API.getOne(selectedExercisesId.value)
  },
  enabled: computed(() => selectedExercisesId.value !== 0),
})

const { mutate: deleteExercise } = useMutation({
  mutationFn: (deletedId: number) => {
    return EXERCISE_API.delete(deletedId)
  },
  onSuccess: () => {
    closeModal()
  },
})

const { mutate: createExercise } = useMutation({
  mutationFn: () => {
    return EXERCISE_API.create(formData.value)
  },
  onSuccess: (data) => {
    for (const tag of selectedIdsTag.value) {
      addTag({
        id: data.id,
        categoryId: tag,
      })
    }
    closeSidebar()
  },
})

const { mutate: addTag } = useMutation({
  mutationFn: ({ id, categoryId }: { id: number; categoryId: number }) => {
    return EXERCISE_API.addTag(id, categoryId)
  },
  onSuccess: () => {
    closeSidebar()
  },
})

const { mutate: deleteTag } = useMutation({
  mutationFn: ({ id, categoryId }: { id: number; categoryId: number }) => {
    return EXERCISE_API.deleteTag(id, categoryId)
  },
  onSuccess: () => {
    closeSidebar()
  },
})

const { mutate: updateExercise } = useMutation({
  mutationFn: (updatedId: number) => {
    return EXERCISE_API.update(updatedId, formData.value)
  },
  onSuccess: (data) => {
    const createDiff = selectedIdsTag.value.filter(
      (item) => !exerciseOneData.value.categoryIds.includes(item),
    )
    const deleteDiff = exerciseOneData.value.categoryIds.filter(
      (item) => !selectedIdsTag.value.includes(item),
    )
    for (const tag of createDiff) {
      addTag({
        id: data.id,
        categoryId: tag,
      })
    }
    for (const tag of deleteDiff) {
      deleteTag({
        id: data.id,
        categoryId: tag,
      })
    }
    closeSidebar()
  },
})

watch(selectedCategoryId, (value) => {
  selectedCategoryId.value = value ? Number(value) : null
})

watch(exerciseOneData, (newValue) => {
  if (!newValue) return
  const {
    id: _id,
    createdAt: _createdAt,
    deletedAt: _deletedAt,
    categories: _categories,
    categoryIds: _categoryIds,
    ...prepared
  } = newValue
  selectedIdsTag.value = (newValue.categoryIds ?? []).map(Number)
  console.log(newValue)
  formData.value = prepared
})
</script>

<template>
  <vim-modal-drawer
    v-if="isShowDeleteModal"
    title="Удалить упражнение"
    description="Внимание, при удалении упражнения оно удалится из всех тренировок"
    submit-text="Удалить"
    @cancel="closeModal()"
    @submit="deleteExercise(selectedExercisesId)"
  />

  <VimSidebar
    v-if="isShowSidebar"
    title="Добавить или изменить упражнение"
    @submit="handleUpdateOrCreate()"
    @cancel="closeSidebar()"
  >
    <VimTextbox type="file" @change="onFileChange" />
    <VimTextbox type="input" label="Название упражнения" v-model="formData.title" />
    <VimTextarea label="Описание упражнения" v-model="formData.content" />
    <VimTextbox type="range" :min="0" :max="120" v-model="formData.during" />
    <p style="margin: -30px 0 0 0">Длительность упражнения (в минутах) - {{ formData.during }}</p>
    <div class="tags">
      <div v-for="group in groupedTags" :key="group.id" class="group-block">
        <div class="group-title" style="margin: 15px 0 10px 0">
          {{ group.name }}
        </div>
        <div class="category-tags">
          <span
            @click="tag(category.id)"
            v-for="category in expandedGroups.has(group.id)
              ? group.categories
              : group.categories.slice(0, 3)"
            :key="category.id"
            class="category-tag"
            :class="{ 'active-tag': (selectedIdsTag ?? []).includes(category.id) }"
          >
            {{ category.name }}
          </span>

          <span v-if="group.categories.length > 3" class="more-tag" @click="toggleGroup(group.id)">
            ...
          </span>
        </div>
      </div>
    </div>
  </VimSidebar>

  <VimButton text="Добавить упражнение" @click="openSidebar()" />

  <div class="groups">
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

    <div class="group-list">
      <div v-for="exercise in exercisesData ?? []" :key="exercise.id" class="exercise-card">
        <div class="exercise-left">
          <div class="exercise-image-wrapper">
            <img
              v-if="exercise.imagePath"
              :src="`${baseUrl}/uploads/exercises/${exercise.imagePath}`"
              :alt="exercise.title"
              class="exercise-image"
            />
            <div v-else class="exercise-placeholder"></div>
          </div>
        </div>

        <div class="exercise-body">
          <div class="exercise-top">
            <div class="exercise-badges">
              <span v-for="category in exercise.categories" :key="category" class="exercise-badge">
                {{ category }}
              </span>
            </div>
            <div class="btn-groups">
              <button class="delete-btn" @click="openModal(exercise.id)">
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
              <button class="edit-btn" @click.stop="openSidebar(exercise.id)">
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
          <div class="exercise-title">
            {{ exercise.title }}
          </div>
          <div class="exercise-meta">⏱ {{ exercise.during }} мин</div>
        </div>
      </div>
    </div>

    <div v-if="!exercisesData?.length" class="status">Упражнения не найдены</div>
  </div>
</template>

<style scoped>
.exercise-card {
  display: flex;
  gap: 20px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 20px;
  padding: 18px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.category-tags {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  gap: 8px;
}
.active-tag {
  background: #eef8e8 !important;
  color: #4f8f2f !important;
}
.category-tag {
  background: #e0f2fe;
  color: #0369a1;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 500;
}
.more-tag {
  cursor: pointer;
  color: #6b7280;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 6px;
}
.more-tag:hover {
  color: #111;
  background: #f3f4f6;
}

.exercise-left {
  flex-shrink: 0;
}

.exercise-image-wrapper {
  width: 160px;
  height: 160px;
  border-radius: 18px;
  overflow: hidden;
  background: #f3f4f6;
}

.exercise-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.exercise-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.exercise-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.exercise-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.exercise-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.exercise-title {
  margin-top: 14px;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.exercise-meta {
  margin-top: 8px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}
@media (max-width: 768px) {
  .exercise-card {
    flex-direction: column;
  }

  .exercise-image-wrapper {
    width: 100%;
    height: 220px;
  }

  .exercise-top {
    flex-direction: column;
  }

  .btn-groups {
    margin-top: 12px;
  }
}
</style>
