<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/modules/auth/store'
const store = useAuthStore()
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <h1>Wellness Fitness</h1>
      </div>
      <div class="header-actions">
        <p>{{ store.user?.username }}</p>

        <div class="profile-wrapper">
          <button class="profile-btn" title="Профиль" @click="toggleMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <div v-if="isMenuOpen" class="profile-menu">
            <button @click="store.logout()">Выйти</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-wrapper {
  position: relative;
}

.profile-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;

  min-width: 180px;
  padding: 8px;

  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-menu button {
  padding: 10px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;
}

.profile-menu button:hover {
  background: #f3f4f6;
}

.header {
  background-color: #85b180;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.profile-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.profile-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .header-content {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .logo h1 {
    font-size: 1.2rem;
  }
}
</style>
