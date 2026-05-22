<template>
  <div class="layout">
    <div class="overlay" @click="$emit('cancel')" />

    <aside class="sidebar">
      <div class="sidebar-header">
        <h3 class="page-title">{{ props.title }}</h3>
      </div>

      <div class="sidebar-content">
        <slot />
      </div>

      <div class="sidebar-footer">
        <button type="button" class="footer-btn cancel-btn" @click="$emit('cancel')">Отмена</button>

        <button type="button" class="footer-btn submit-btn" @click="$emit('submit')">
          Сохранить
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>()
defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
}>()
</script>

<style scoped>
.layout {
  position: fixed;
  inset: 0;
  display: flex;
  z-index: 1000;
}

.page-title {
  font-size: 1.5rem;
  margin: 0;
  color: #264653;
}

.overlay {
  flex: 1;
  background: rgba(0, 0, 0, 0.35);
}

.sidebar {
  width: 30%;
  min-width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-right: 1px solid #ececec;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.06);

  box-sizing: border-box;
}

.sidebar-header {
  padding: 20px 20px 0 20px;
}

.sidebar-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-footer {
  display: flex;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #ececec;
  background: #ffffff;
}

.footer-btn {
  flex: 1;
  height: 44px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.footer-btn:hover {
  transform: translateY(-1px);
}

.cancel-btn {
  background: #f5f5f5;
  color: #444;
}

.cancel-btn:hover {
  background: #e9e9e9;
}

.submit-btn {
  background: #222;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.submit-btn:hover {
  background: #111;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
</style>
