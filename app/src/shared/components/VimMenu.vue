<script setup lang="ts">
import { useUiStore } from '@/shared/stores/ui'

const ui = useUiStore()

const menuItems = [
  { label: 'Главная', link: '/', icon: 'home' },
  { label: 'Личный план', link: '/personal', icon: 'plan' },
  { label: 'Библиотека', link: '/library', icon: 'library' },
  { label: 'Админ-панель', link: '/admin', icon: 'admin' },
]

const icons = {
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  plan: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>`,
  library: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
  admin: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd"/>
</svg>
`,
}
</script>

<template>
  <div :class="['sidebar', { open: !ui.is_mobile }]">
    <ul class="menu">
      <li :class="['li', { open: !ui.is_mobile }]" v-for="(item, index) in menuItems" :key="index">
        <router-link :to="item.link" class="full-link">
          <div :class="['icon-wrapper', { open: !ui.is_mobile }]" v-html="icons[item.icon]"></div>
          <span v-if="!ui.is_mobile">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 12%;
  transition: width 0.3s ease;
  overflow: hidden;
  min-height: 100vh;
}

.sidebar.open {
  width: 18%;
}

.icon-wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper.open {
  margin-left: 10px;
}

.icon-wrapper :deep(svg) {
  width: 24px;
  height: 24px;
}

.menu {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu li {
  display: flex;
  align-items: center;
  border-radius: 12px;
  margin: 10px 0 0 0;
  width: 90%;
}

.menu li.open {
  justify-content: flex-start;
}
.menu li:hover {
  background-color: #eae8e2;
}

a.full-link {
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: inherit;
  padding: 0.75rem 1rem;
  gap: 8px;
}

.icon-wrapper {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #264653;
}

.icon-wrapper.open {
  margin-left: 10px;
}
.icon-wrapper :deep(svg) {
  width: 24px;
  height: 24px;
}

.full-link span {
  white-space: nowrap;
}

.menu .router-link-active,
.menu .router-link-exact-active {
  background: #d7ead5;
  border-radius: 14px;
}
</style>
