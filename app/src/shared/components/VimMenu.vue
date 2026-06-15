<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store'

const auth = useAuthStore()

const menuItems = [
  { label: 'Главная', link: '/home', icon: 'home', needAdmin: false },
  { label: 'Личный план', link: '/personal', icon: 'plan', needAdmin: false },
  { label: 'Библиотека', link: '/library', icon: 'library', needAdmin: false },
  { label: 'Админ-панель', link: '/admin', icon: 'admin', needAdmin: true },
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
  <nav class="sidebar">
    <ul class="menu">
      <li v-for="(item, index) in menuItems" :key="index" v-show="!item.needAdmin || auth.isAdmin">
        <router-link :to="item.link" class="full-link">
          <div class="icon-wrapper" v-html="icons[item.icon]"></div>

          <span class="label">
            {{ item.label }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  background: white;
  border-right: 1px solid #ececec;
  transition: all 0.3s ease;
}

.menu {
  list-style: none;
  padding: 12px 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu li {
  width: 100%;
}

.full-link {
  display: flex;
  align-items: center;
  gap: 12px;

  text-decoration: none;
  color: #264653;

  padding: 12px 16px;
  margin: 0 10px;

  border-radius: 14px;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.full-link:hover {
  background: #eae8e2;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 36px;
  width: 36px;
  height: 36px;
}

.icon-wrapper :deep(svg) {
  width: 24px;
  height: 24px;
}

.label {
  white-space: nowrap;
  font-size: 15px;
}

.router-link-active .router-link-exact-active {
  background: #d7ead5;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 72px;
  }

  .label {
    display: none;
  }

  .full-link {
    justify-content: center;
    margin: 0 6px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;

    bottom: 0;
    left: 0;

    width: 100%;
    min-height: auto;
    height: 72px;

    border-right: none;
    border-top: 1px solid #ececec;

    background: white;

    z-index: 1000;
  }

  .menu {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    height: 100%;

    padding: 0;
    gap: 0;
  }

  .menu li {
    width: auto;
    flex: 1;
  }

  .full-link {
    height: 100%;
    margin: 0;
    border-radius: 0;

    justify-content: center;
    align-items: center;
  }

  .label {
    display: none;
  }

  .icon-wrapper {
    width: 28px;
    height: 28px;
    min-width: 28px;
  }

  .icon-wrapper :deep(svg) {
    width: 24px;
    height: 24px;
  }

  .router-link-active,
  .router-link-exact-active {
    background: #d7ead5;
  }
}
</style>
