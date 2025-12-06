<template>
  <div class="space-y-2">
    <!-- Header -->
    <div
      class="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-semibold uppercase tracking-wider"
      style="color: var(--color-text-muted)"
    >
      <div class="col-span-1"></div>
      <!-- Icon placeholder -->
      <div class="col-span-3">Fornecedor</div>
      <div class="col-span-3">Fantasia</div>
      <div class="col-span-2">Cidade</div>
      <div class="col-span-2">Última carga</div>
      <div class="col-span-1 text-right">Cadastro</div>
    </div>

    <!-- List Items -->
    <div
      v-for="supplier in suppliers"
      :key="supplier.id"
      class="group flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 items-center p-4 rounded-xl border transition-colors"
      style="
        background-color: var(--color-surface);
        border-color: var(--color-border);
      "
    >
      <!-- Icon -->
      <div class="col-span-1 flex items-center justify-center md:justify-start">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-green-500"
          style="background-color: rgba(74, 222, 128, 0.2)"
        >
          <Building2 class="w-5 h-5" />
        </div>
      </div>

      <!-- Name -->
      <div class="col-span-3 w-full text-center md:text-left">
        <span
          class="font-bold text-lg md:text-base"
          style="color: var(--color-text)"
          >{{ supplier.name }}</span
        >
      </div>

      <!-- Fantasy -->
      <div
        class="col-span-3 w-full text-center md:text-left font-medium"
        style="color: var(--color-text-muted)"
      >
        {{ supplier.fantasy }}
      </div>

      <!-- City -->
      <div
        class="col-span-2 w-full text-center md:text-left"
        style="color: var(--color-text-muted)"
      >
        {{ supplier.city }}
      </div>

      <!-- Last Load -->
      <div
        class="col-span-2 w-full text-center md:text-left"
        style="color: var(--color-text-muted)"
      >
        {{ supplier.lastLoad }}
      </div>

      <!-- Actions/Status -->
      <div
        class="col-span-1 w-full flex items-center justify-center md:justify-end gap-3"
      >
        <div
          v-if="supplier.hasAlert"
          style="color: var(--color-status-vencido)"
          title="Alerta"
        >
          <AlertCircle class="w-5 h-5" />
        </div>
        <button
          class="transition-colors hover:opacity-80"
          style="color: var(--color-text-muted)"
        >
          <MessageSquareText class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, MessageSquareText, AlertCircle } from "lucide-vue-next";
import type { Supplier } from "../mocks/suppliers";

defineProps<{
  suppliers: Supplier[];
}>();
</script>
