<template>
  <div class="layout">
    <div class="overlay" @click="handleCancel" />

    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">{{ title }}</h3>
        <button v-if="!isOneButton" class="close-btn" @click="handleCancel">×</button>
      </div>

      <div v-if="description" class="modal-content">
        <p class="modal-description">{{ description }}</p>
        <slot />
      </div>

      <div class="modal-footer" :class="{ 'one-button': isOneButton }">
        <button type="button" class="footer-btn submit-btn" @click="handleSubmit">
          {{ submitText }}
        </button>
        <button
          v-if="!isOneButton"
          type="button"
          class="footer-btn cancel-btn"
          @click="handleCancel"
        >
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  isOneButton?: boolean
  submitText?: string
}>()

const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const handleSubmit = () => {
  emit('submit')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.layout {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}

.modal {
  position: relative;
  width: 90%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  animation: modalFadeIn 0.2s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
}

.modal-title {
  font-size: 1.5rem;
  margin: 0;
  color: #264653;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  border-radius: 12px;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #e9e9e9;
  transform: translateY(-1px);
}

.modal-content {
  padding: 20px 24px;
}

.modal-description {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: #555;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px 24px 24px;
  border-top: 1px solid #ececec;
  background: #ffffff;
  border-radius: 0 0 24px 24px;
}

.modal-footer.one-button {
  justify-content: center;
}

.modal-footer.one-button .footer-btn {
  max-width: 200px;
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
