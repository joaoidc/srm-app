<template>
  <div class="min-h-screen p-6 text-gray-900 dark:text-white">
    <h1 class="text-3xl font-bold mb-6">Fornecedores</h1>
    <AvisoEmConstrucao />
  </div>
</template>

<script setup lang="ts">
import AvisoEmConstrucao from "@/components/common/AvisoEmConstrucao.vue";

definePageMeta({ layout: "default" });
</script>
