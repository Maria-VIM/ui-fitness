<script setup lang="ts">
import DefaultLayout from "@/shared/layout/DefaultLayout.vue";
</script>

<template>
    <DefaultLayout>
      <RouterView/>
    </DefaultLayout>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden;
}
</style>
