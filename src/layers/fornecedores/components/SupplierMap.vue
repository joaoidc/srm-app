<template>
  <div
    class="h-[600px] w-full rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700"
  >
    <div class="text-center space-y-4">
      <div
        class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto text-gray-400"
      >
        <Map class="w-8 h-8" />
      </div>
      <div class="space-y-1">
        <h3 class="text-xl font-bold text-white">Mapa de Fornecedores</h3>
        <p class="text-gray-400">
          A visualização por mapa estará disponível em breve.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Map } from "lucide-vue-next";
</script>
