<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement } from 'chart.js'
import type { WorkoutSessionStatisticInterface } from '@/modules/personal-plan/interfaces/passing/workout-session-statistics.interface.ts'
import { computed } from 'vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const props = defineProps<{
  statistics: WorkoutSessionStatisticInterface[]
}>()

const chartData = computed(() => ({
  labels: props.statistics.map((item) => item.date),
  datasets: [
    {
      label: 'Тренировки',
      data: props.statistics.map((item) => item.total),
    },
  ],
}))

const chartOptions = {
  responsive: true,
}
</script>
