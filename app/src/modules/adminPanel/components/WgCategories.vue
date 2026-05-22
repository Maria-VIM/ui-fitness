<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import VimButton from '@/shared/components/VimButton.vue'
import { GROUP_API } from '@/modules/adminPanel/api/groups.ts'
import { CATEGORY_API } from '@/modules/adminPanel/api/categories.ts'
import type { CategoryFormInterface } from '@/modules/adminPanel/interfaces/categories/category-form.interface.ts'
import VimModalDrawer from '@/shared/components/VimModalDrawer.vue'
import VimSidebar from '@/shared/components/VimSidebar.vue'
import VimTextbox from '@/shared/components/VimTextbox.vue'
import type { CategoryInterface } from '@/modules/adminPanel/interfaces/categories/category.interface.ts'

const openedGroups = ref<number[]>([])
const queryClient = useQueryClient()

const isShowSidebar = ref<boolean>(false)
const isShowDeleteModal = ref<boolean>(false)

const selectedId = ref<number>(0)
const deleteTitle = ref<string>('')
const deleteDescription = ref<string>('')
const deleteBtnSubmit = ref<string>('')
const deleteUsing = ref<number>(0)

const defaultFormData: CategoryFormInterface = {
  groupId: 1,
  name: '',
}

const formData = ref<CategoryFormInterface>({ ...defaultFormData })

const toggleGroup = (groupId: number) => {
  if (openedGroups.value.includes(groupId)) {
    openedGroups.value = openedGroups.value.filter((id) => id !== groupId)
  } else {
    openedGroups.value.push(groupId)
  }
}

const isOpened = (groupId: number) => {
  return openedGroups.value.includes(groupId)
}

function openModal(id: number, name: string, using: number) {
  deleteDescription.value =
    using > 0
      ? `Удалить категорию '${name}' невозможно, так как к ней привязаны упражнения`
      : `Удалить категорию '${name}'`
  deleteTitle.value = using > 0 ? `Невозможно удалить` : `Удалить категорию`
  deleteBtnSubmit.value = using > 0 ? `Продолжить` : `Исполнить`
  deleteUsing.value = using
  isShowDeleteModal.value = true
  selectedId.value = id
}

function openSidebar(id?: number) {
  if (id) selectedId.value = id
  isShowSidebar.value = true
}

function closeModal() {
  queryClient.invalidateQueries({ queryKey: ['categories'] })
  selectedId.value = 0
  isShowDeleteModal.value = false
}

function closeSidebar() {
  queryClient.invalidateQueries({ queryKey: ['categories'] })
  selectedId.value = 0
  formData.value = { ...defaultFormData }
  isShowSidebar.value = false
}

function handleDeleteCategory() {
  if (deleteUsing.value > 0) {
    closeModal()
  } else {
    deleteCategory(selectedId.value)
    closeModal()
  }
}

function handleCreateOrUpdateCategory() {
  if (formData.value.name == '') {
    alert('Нельзя использовать пустое название')
    return
  }
  if (selectedId.value === 0) createCategory()
  else updateCategory()
}

const handleClick = (id: number) => {
  openSidebar()
  formData.value.groupId = id
}

const {
  data: groupsData,
  isLoading,
  error,
} = useQuery({
  queryKey: ['groups'],
  queryFn: () => {
    return GROUP_API.get()
  },
})

const { data: oneCategoryData } = useQuery({
  queryKey: ['group', selectedId],
  queryFn: () => {
    return CATEGORY_API.getOne(selectedId.value)
  },
  enabled: computed(() => selectedId.value > 0),
})

const {
  data: categoriesData,
  isLoading: isCategoriesLoading,
  error: errorCategory,
} = useQuery({
  queryKey: ['categories'],
  queryFn: () => {
    return CATEGORY_API.get()
  },
})

const { mutate: deleteCategory } = useMutation({
  mutationFn: (deletedId: number) => {
    return CATEGORY_API.delete(deletedId)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  },
})

const { mutate: createCategory } = useMutation({
  mutationFn: () => {
    return CATEGORY_API.create(formData.value)
  },
  onSuccess: () => {
    closeSidebar()
  },
})

const { mutate: updateCategory } = useMutation({
  mutationFn: () => {
    return CATEGORY_API.update(selectedId.value, formData.value)
  },
  onSuccess: () => {
    closeSidebar()
  },
})

watch(oneCategoryData, (newValue) => {
  if (!newValue) return
  const { id: _id, ...prepared } = newValue
  formData.value = { ...prepared }
})
</script>

<template>
  <VimButton text="Добавить категорию" @click="openSidebar()" />
  <vim-sidebar
    v-if="isShowSidebar"
    title="Добавить или изменить категорию"
    @cancel="closeSidebar()"
    @submit="handleCreateOrUpdateCategory()"
  >
    <select v-model="formData.groupId" class="filter-select" style="width: 100%">
      <option v-for="group in groupsData ?? []" :key="group.id" :value="group.id">
        {{ group.name }}
      </option>
    </select>
    <VimTextbox v-model="formData.name" type="input" label="Название категории" />
  </vim-sidebar>
  <vim-modal-drawer
    v-if="isShowDeleteModal"
    :title="deleteTitle"
    :description="deleteDescription"
    :submit-text="deleteBtnSubmit"
    @cancel="closeModal()"
    @submit="handleDeleteCategory()"
  />
  <div class="groups">
    <div v-if="isLoading || isCategoriesLoading" class="status">Загрузка...</div>
    <div v-else-if="error || errorCategory" class="status error">Ошибка загрузки</div>
    <div v-else class="group-list">
      <div v-for="group in groupsData" :key="group.id" class="group-wrapper">
        <div class="group-item" @click="toggleGroup(group.id)">
          <div class="group-left">
            <svg
              class="arrow"
              :class="{ opened: isOpened(group.id) }"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="group-name">
              {{ group.name }}
            </span>
          </div>
          <button class="plus-btn" @click.stop="handleClick(group.id)">
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
          </button>
        </div>

        <transition name="dropdown">
          <div v-if="isOpened(group.id)" class="categories">
            <div
              v-for="category in categoriesData?.filter(
                (category: CategoryInterface) => category.groupId === group.id,
              )"
              :key="category.id"
              class="category-item"
            >
              {{ category.name }}
              <div class="btn-groups">
                <button
                  class="delete-btn"
                  @click="openModal(category.id, category.name, category.using)"
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
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                </button>
                <button class="edit-btn" @click.stop="openSidebar(category.id)">
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
            <div
              v-if="
                !categoriesData?.some(
                  (category: CategoryInterface) => category.groupId === group.id,
                )
              "
              class="empty"
            >
              Нет категорий
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
