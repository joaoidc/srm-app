<template>
  <div class="p-6 text-gray-900 dark:text-white">
    <h1 class="text-3xl font-bold mb-6">Check-in</h1>
    <AvisoEmConstrucao />
  </div>
</template>

<script setup lang="ts">
import AvisoEmConstrucao from "@/components/common/AvisoEmConstrucao.vue";

definePageMeta({ layout: "default" });
</script>
