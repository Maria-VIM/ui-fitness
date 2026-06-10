<script setup lang="ts">
import { computed } from 'vue'
import {
  Dumbbell,
  CalendarDays,
  ClipboardList,
  Activity,
  Target,
  ChevronRight,
} from 'lucide-vue-next'
import VimTitle from '@/shared/components/VimTitle.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = [
  {
    title: 'Тренировок',
    value: 24,
    subtitle: '',
    icon: Dumbbell,
  },
  {
    title: 'Сессий',
    value: 18,
    subtitle: 'завершено',
    icon: CalendarDays,
  },
  {
    title: 'Планов упражнений',
    value: 4,
    subtitle: 'активный',
    icon: ClipboardList,
  },
]

const quickAccess = [
  {
    title: 'Упражнения',
    description: 'Просмотр всех упражнений',
    icon: Activity,
    route: '/library',
  },
  {
    title: 'Планы',
    description: 'Ваши планы тренировок',
    icon: Target,
    route: '/personal',
  },
]

const chartData = [
  { day: 'Пн', value: 12 },
  { day: 'Вт', value: 18 },
  { day: 'Ср', value: 15 },
  { day: 'Чт', value: 24 },
  { day: 'Пт', value: 30 },
  { day: 'Сб', value: 22 },
  { day: 'Вс', value: 34 },
]

const chartWidth = 800
const chartHeight = 260
const padding = 40

const maxValue = Math.max(...chartData.map((d) => d.value))

const points = computed(() => {
  return chartData
    .map((item, index) => {
      const x = padding + (index * (chartWidth - padding * 2)) / (chartData.length - 1)

      const y = chartHeight - padding - (item.value / maxValue) * (chartHeight - padding * 2)

      return `${x},${y}`
    })
    .join(' ')
})
</script>

<template>
  <div class="dashboard">
    <section class="welcome">
      <VimTitle title="Добро пожаловать!" />
      <p>Время заботиться о себе и достигать новых целей.</p>
    </section>

    <section class="stats">
      <article v-for="item in stats" :key="item.title" class="stat-card">
        <div class="stat-icon">
          <component :is="item.icon" :size="28" />
        </div>

        <div class="stat-content">
          <span class="stat-title">
            {{ item.title }}
          </span>

          <span class="stat-value">
            {{ item.value }}
          </span>

          <span v-if="item.subtitle" class="stat-subtitle">
            {{ item.subtitle }}
          </span>
        </div>
      </article>
    </section>

    <section class="quick-section">
      <h2>Быстрый доступ</h2>

      <div class="quick-grid">
        <article
          v-for="item in quickAccess"
          :key="item.title"
          class="quick-card"
          @click="router.push(item.route)"
        >
          <div class="quick-header">
            <div class="quick-icon">
              <component :is="item.icon" :size="22" />
            </div>

            <ChevronRight :size="20" />
          </div>

          <div class="quick-title">
            {{ item.title }}
          </div>

          <div class="quick-description">
            {{ item.description }}
          </div>
        </article>
      </div>
    </section>

    <section class="chart-section">
      <h2>График тренировок пользователей</h2>

      <div class="chart-card">
        <svg :viewBox="`0 0 ${chartWidth} ${chartHeight}`" class="chart">
          <line x1="40" y1="220" x2="760" y2="220" class="axis" />

          <line x1="40" y1="20" x2="40" y2="220" class="axis" />

          <line
            v-for="i in 4"
            :key="i"
            x1="40"
            :y1="220 - i * 40"
            x2="760"
            :y2="220 - i * 40"
            class="grid"
          />

          <polyline
            :points="points"
            fill="none"
            stroke="#8EB48D"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <template v-for="(item, index) in chartData" :key="item.day">
            <circle
              :cx="padding + (index * (chartWidth - padding * 2)) / (chartData.length - 1)"
              :cy="chartHeight - padding - (item.value / maxValue) * (chartHeight - padding * 2)"
              r="6"
              fill="#8EB48D"
            />

            <text
              :x="padding + (index * (chartWidth - padding * 2)) / (chartData.length - 1)"
              y="245"
              text-anchor="middle"
              class="label"
            >
              {{ item.day }}
            </text>
          </template>
        </svg>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 32px;
  min-height: 100vh;
}

.welcome {
  margin-bottom: 32px;
}

.welcome p {
  color: #777;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 36px;
}

.stat-card {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: white;
  border-radius: 20px;
  border: 1px solid #e8e8e8;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #dcebd6;
  color: #6e8f6d;

  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-title {
  color: #666;
  font-size: 14px;
}

.stat-value {
  font-size: 48px;
  line-height: 1;
  margin: 8px 0;
  color: #617560;
}

.stat-subtitle {
  color: #888;
  font-size: 13px;
}

.quick-section {
  margin-bottom: 36px;
}

.quick-section h2,
.chart-section h2 {
  margin-bottom: 18px;
  color: #222;
  font-weight: 500;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.quick-card {
  padding: 20px;
  background: white;
  border-radius: 20px;
  border: 1px solid #e8e8e8;
  transition: 0.2s;
  cursor: pointer;
}

.quick-card:hover {
  transform: translateY(-2px);
}

.quick-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  color: #777;
}

.quick-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #dcebd6;
  color: #6e8f6d;

  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-title {
  font-weight: 600;
  margin-bottom: 6px;
}

.quick-description {
  color: #777;
  font-size: 14px;
}

.chart-card {
  background: white;
  border-radius: 24px;
  border: 1px solid #e8e8e8;
  padding: 24px;
}

.chart {
  width: 100%;
  height: 320px;
}

.axis {
  stroke: #d8d8d8;
  stroke-width: 1.5;
}

.grid {
  stroke: #efefef;
  stroke-width: 1;
}

.label {
  fill: #666;
  font-size: 12px;
}

@media (max-width: 992px) {
  .stats,
  .quick-grid {
    grid-template-columns: 1fr;
  }
}
</style>
