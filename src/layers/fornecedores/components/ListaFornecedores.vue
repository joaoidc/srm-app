<template>
  <div>
    <div
      class="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-[var(--color-background)] rounded-t-lg border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider"
    >
      <div class="col-span-4">Fornecedor</div>
      <div class="col-span-2">Cidade</div>
      <div class="col-span-2">Última carga</div>
      <div class="col-span-2 text-center">Status</div>
      <div class="col-span-2 text-end">Ações</div>
    </div>

    <div class="space-y-2 md:space-y-0">
      <div
        v-for="fornecedor in fornecedores"
        :key="fornecedor.codfor"
        class="group bg-[var(--color-surface)] md:rounded-none first:md:rounded-t-none last:md:rounded-b-lg rounded-lg border border-[var(--color-border)] md:border-t-0 first:md:border-t transition-all duration-200 px-4 py-3 md:px-5 md:py-2.5 hover:bg-[var(--color-hover)] cursor-pointer"
        @click="$emit('select', fornecedor)"
      >
        <div class="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 items-center">
          <div class="col-span-4 flex items-center gap-3 w-full">
            <div
              class="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
              :class="getIconClass(fornecedor.status)"
            >
              <Building2 class="w-4 h-4" />
            </div>
            <div class="flex flex-col gap-0.5">
              <span class="font-semibold text-[var(--color-text)] text-sm">
                {{ fornecedor.fornecedor }}
              </span>
              <span class="text-xs text-[var(--color-text-muted)]">
                {{ fornecedor.fanta }}
              </span>
            </div>
          </div>

          <div class="hidden md:flex col-span-2 items-center">
            <span class="text-sm text-[var(--color-text-muted)]">
              {{ fornecedor.cidade }}
            </span>
          </div>

          <div class="hidden md:flex col-span-2 items-center">
            <span class="text-sm text-[var(--color-text-muted)]">
              {{ fornecedor.ultima_carga }}
            </span>
          </div>

          <div class="col-span-2 w-full md:w-auto flex md:justify-center">
            <UiBadge
              v-if="fornecedor.status"
              :variant="getStatusVariant(fornecedor.status)"
              :dot="true"
              size="small"
            >
              {{ fornecedor.status }}
            </UiBadge>
          </div>

          <div class="col-span-2 w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center justify-end gap-2">
            <UiButton
              variant="primary"
              size="small"
              class="w-full md:w-auto"
              @click.stop="$emit('add-route', fornecedor)"
            >
              <MapPin class="w-3 h-3" />
              Adicionar à rota
            </UiButton>

            <UiButton
              variant="secondary"
              size="small"
              class="w-full md:w-auto"
              @click.stop
            >
              <MessageSquareText class="w-3 h-3" />
            </UiButton>
          </div>

          <div class="flex md:hidden w-full items-center justify-between text-xs text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border-subtle)]">
            <div class="flex items-center gap-2">
              <span>{{ fornecedor.cidade }}</span>
              <span class="w-1 h-1 rounded-full bg-[var(--color-text-muted)] opacity-50"></span>
              <span>{{ fornecedor.ultima_carga }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, MessageSquareText, MapPin } from "lucide-vue-next";
import UiBadge from "@/components/ui/data-display/UiBadge.vue";
import UiButton from "@/components/ui/buttons/UiButton.vue";
import type { Fornecedor } from "../types/fornecedores";

defineProps<{
  fornecedores: Fornecedor[];
}>();

defineEmits<{
  (e: "select", fornecedor: Fornecedor): void;
  (e: "add-route", fornecedor: Fornecedor): void;
}>();

const getStatusVariant = (status: string): string => {
  const normalized = (status || "").toLowerCase().trim();
  const map: Record<string, string> = {
    ativo: "success",
    alerta: "warning",
    inativo: "danger",
  };
  return map[normalized] || "default";
};

const getIconClass = (status: string): string => {
  const normalized = (status || "").toLowerCase().trim();
  const map: Record<string, string> = {
    ativo: "bg-green-500/10 text-green-500",
    alerta: "bg-yellow-500/10 text-yellow-500",
    inativo: "bg-red-500/10 text-red-500",
  };
  return map[normalized] || "bg-[var(--color-primary)]/10 text-[var(--color-primary)]";
};
</script>
