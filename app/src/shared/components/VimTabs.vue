<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export interface TabItem {
  name: string
  title?: string
  disabled?: boolean
}

const props = defineProps<{
  tabs: TabItem[]
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const router = useRouter()
const route = useRoute()

const getInitialTab = () => {
  const queryTab = route.query.name as string
  if (queryTab && props.tabs.some(tab => tab.name === queryTab && !tab.disabled)) {
    return queryTab
  }
  return props.modelValue || props.tabs[0]?.name || ''
}

const activeTab = ref(getInitialTab())

const setActiveTab = (tabName: string) => {
  const tab = props.tabs.find(t => t.name === tabName)
  if (tab && !tab.disabled) {
    activeTab.value = tabName
    emit('update:modelValue', tabName)
    router.push({
      query: {
        ...route.query,
        name: tabName
      }
    })
  }
}

const getTabTitle = (tab: TabItem): string => {
  return tab.title || tab.name
}

watch(() => route.query.name, (newName) => {
  if (newName && typeof newName === 'string') {
    const tab = props.tabs.find(t => t.name === newName)
    if (tab && !tab.disabled && activeTab.value !== newName) {
      activeTab.value = newName
      emit('update:modelValue', newName)
    }
  }
})

watch(activeTab, (newTab) => {
  if (props.modelValue !== newTab) {
    emit('update:modelValue', newTab)
  }
})

provide('activeTab', activeTab)
provide('tabs', props.tabs)
</script>

<template>
  <div class="vim-tabs">
    <div class="tab-headers">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        class="tab-button"
        :class="{
          active: activeTab === tab.name,
          disabled: tab.disabled
        }"
        :disabled="tab.disabled"
        @click="setActiveTab(tab.name)"
      >
        {{ getTabTitle(tab) }}
      </button>
    </div>
    <div class="tab-content">
      <slot
        :name="activeTab"
        :active="activeTab"
      />
    </div>
  </div>
</template>

<style scoped>
.vim-tabs {
  width: 100%;
}

.tab-headers {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 2px solid #F0F3F2;
  padding-bottom: 4px;
}

.tab-button {
  padding: 12px 28px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #6C7A7A;
  transition: all 0.3s ease;
  border-radius: 12px 12px 0 0;
  position: relative;
}

.tab-button:hover:not(.disabled) {
  color: #2A9D8F;
  background-color: #F0F3F2;
}

.tab-button.active {
  color: #2A9D8F;
  background-color: #F0F3F2;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #2A9D8F, #E76F51);
  border-radius: 3px 3px 0 0;
}

.tab-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #9ca3af;
}

.tab-content {
  padding: 24px 0;
  color: #264653;
}

@media (max-width: 768px) {
  .tab-button {
    padding: 10px 20px;
    font-size: 14px;
  }

  .tab-headers {
    gap: 8px;
  }
}
</style>
