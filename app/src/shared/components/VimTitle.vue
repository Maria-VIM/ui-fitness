<script setup lang="ts">
import VimButton from '@/shared/components/VimButton.vue'

interface Props {
  title: string
  subtitle?: string
  hasButton?: boolean
  buttonText?: string
}

withDefaults(defineProps<Props>(), {
  hasButton: false,
  buttonText: 'Кнопка',
})

const emit = defineEmits<{
  btnClick: []
}>()

const handleButtonClick = () => {
  emit('btnClick')
}
</script>

<template>
  <div class="title-container">
    <div class="titles">
      <h1 class="main-title">{{ title }}</h1>
      <h2 v-if="subtitle" class="subtitle">{{ subtitle }}</h2>
    </div>
    <VimButton
      style="max-width: 200px"
      v-if="hasButton"
      :text="buttonText"
      @click="handleButtonClick"
    />
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 40px 0;
}

.titles {
  display: flex;
  flex-direction: column;
}

.main-title {
  font-size: 42px;
  font-weight: 300;
  color: #264653;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 20px;
  font-weight: 300;
  color: #264653;
  margin: 4px 0 0;
}

@media (max-width: 768px) {
  .title-container {
    gap: 12px;
    margin-bottom: 16px;
  }

  .main-title {
    font-size: 36px;
    font-weight: 300;
  }

  .subtitle {
    font-size: 16px;
  }
}
</style>
