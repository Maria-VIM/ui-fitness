<script setup lang="ts">
import VimTabs from '@/shared/components/VimTabs.vue'
import WgGroup from '@/modules/adminPanel/components/WgGroup.vue'
import WgCategories from '@/modules/adminPanel/components/WgCategories.vue'
import WgExercises from '@/modules/adminPanel/components/WgExercises.vue'

const tabs = [
  { name: 'groups', title: 'Группы', disabled: false },
  { name: 'categories', title: 'Категории', disabled: false },
  { name: 'exercises', title: 'Упражнение', disabled: false },
]
</script>

<template>
  <VimTabs :tabs="tabs">
    <template #groups>
      <WgGroup />
    </template>
    <template #categories>
      <WgCategories />
    </template>
    <template #exercises>
      <WgExercises />
    </template>
  </VimTabs>
</template>

<style scoped></style>
