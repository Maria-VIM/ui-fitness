<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { GROUP_API } from '@/modules/adminPanel/api/groups.ts'
import VimButton from '@/shared/components/VimButton.vue'
import VimSidebar from '@/shared/components/VimSidebar.vue'
import { computed, ref, watchEffect } from 'vue'
import VimTextbox from '@/shared/components/VimTextbox.vue'
import VimModalDrawer from '@/shared/components/VimModalDrawer.vue'

const queryClient = useQueryClient()

const isShowSidebar = ref<boolean>(false)
const isShowDeleteModal = ref<boolean>(false)

const selectedId = ref<number>(0)
const deleteTitle = ref<string>('')
const deleteDescription = ref<string>('')
const deleteBtnSubmit = ref<string>('')
const deleteUsing = ref<number>(0)

const groupName = ref<string>('')

function openModal(id: number, name: string, using: number) {
  deleteDescription.value =
    using > 0
      ? `Удалить группу '${name}' невозможно, так как к ней привязаны категории`
      : `Удалить группу '${name}'`
  deleteTitle.value = using > 0 ? `Невозможно удалить` : `Удалить группу`
  deleteBtnSubmit.value = using > 0 ? `Продолжить` : `Исполнить`
  deleteUsing.value = using
  isShowDeleteModal.value = true
  selectedId.value = id
}

function openSidebar(id?: number) {
  if (id) selectedId.value = id
  isShowSidebar.value = true
}

function closeSidebar() {
  queryClient.invalidateQueries({ queryKey: ['groups'] })
  selectedId.value = 0
  groupName.value = ''
  isShowSidebar.value = false
}

function closeModal() {
  queryClient.invalidateQueries({ queryKey: ['groups'] })
  selectedId.value = 0
  isShowDeleteModal.value = false
}

function handleDeleteGroup() {
  if (deleteUsing.value > 0) {
    closeModal()
  } else {
    deleteGroup(selectedId.value)
    closeModal()
  }
}

function handleCreateOrUpdateGroup() {
  if (groupName.value === '') {
    alert('Нельзя использовать пустое название')
    return
  }
  if (selectedId.value === 0) createGroup()
  else updateGroup()
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

const { data: oneGroupData } = useQuery({
  queryKey: ['group', selectedId],
  queryFn: () => {
    return GROUP_API.getOne(selectedId.value)
  },
  enabled: computed(() => selectedId.value > 0),
})

const { mutate: deleteGroup } = useMutation({
  mutationFn: (deletedId: number) => {
    return GROUP_API.delete(deletedId)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['groups'] })
  },
})

const { mutate: createGroup } = useMutation({
  mutationFn: () => {
    console.log(groupName.value)
    return GROUP_API.create({ name: groupName.value })
  },
  onSuccess: () => {
    closeSidebar()
  },
})

const { mutate: updateGroup } = useMutation({
  mutationFn: () => {
    return GROUP_API.update(selectedId.value, { name: groupName.value })
  },
  onSuccess: () => {
    closeSidebar()
  },
})

watchEffect(() => {
  if (oneGroupData.value) {
    groupName.value = oneGroupData.value.name
  }
})
</script>

<template>
  <vim-modal-drawer
    v-if="isShowDeleteModal"
    :title="deleteTitle"
    :description="deleteDescription"
    :submit-text="deleteBtnSubmit"
    @cancel="closeModal()"
    @submit="handleDeleteGroup()"
  />
  <vim-sidebar
    v-if="isShowSidebar"
    title="Добавить или изменить группу"
    @cancel="closeSidebar()"
    @submit="handleCreateOrUpdateGroup()"
  >
    <VimTextbox v-model="groupName" type="input" label="Название группы" />
  </vim-sidebar>
  <VimButton text="Добавить группу" @click="openSidebar()" />
  <div class="groups">
    <div v-if="isLoading" class="status">Загрузка...</div>
    <div v-else-if="error" class="status error">Ошибка загрузки</div>
    <div v-else class="group-list">
      <div v-for="group in groupsData" :key="group.id" class="group-item">
        <span class="group-name">
          {{ group.name }}
        </span>
        <div class="btn-groups">
          <button class="delete-btn" @click="openModal(group.id, group.name, group.using)">
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
          <button class="edit-btn" @click="openSidebar(group.id)">
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
    </div>
  </div>
</template>
