<template>
  <div
    class="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-500 py-8"
  >
    <div
      class="rounded-full bg-gray-200 dark:bg-gray-800/50 flex items-center justify-center mb-3"
      :class="[icon ? 'w-12 h-12' : '']"
    >
      <slot name="icon">
        <component :is="icon" class="w-6 h-6 opacity-50" v-if="icon" />
      </slot>
    </div>
    <p class="text-sm font-medium">{{ title }}</p>
    <p v-if="description" class="text-xs text-gray-400 dark:text-gray-600">
      {{ description }}
    </p>

    <div v-if="$slots.action" class="mt-4">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  icon?: Component;
  title: string;
  description?: string;
}>();
</script>
