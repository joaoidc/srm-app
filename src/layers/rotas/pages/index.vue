<template>
  <div class="min-h-screen p-6 bg-[var(--color-background)]">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
    >
      <h1 class="text-2xl font-bold text-[var(--color-text)]">
        Rotas cadastradas
      </h1>

      <div class="flex items-center gap-3 w-full md:w-auto">
        <UiButton
          variant="primary"
          size="medium"
          class="whitespace-nowrap flex-1 md:flex-none"
          @click="showNovaRotaModal = true"
        >
          <Plus class="w-4 h-4" />
          Nova Rota
        </UiButton>

        <UiCalendario
          :range="true"
          :start-date="filtroDataInicio"
          :end-date="filtroDataFim"
          placeholder="Filtrar período"
          @change="handleDateChange"
        />
      </div>
    </div>

    <div
      class="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-[var(--color-background)] rounded-t-lg border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider"
    >
      <div class="col-span-6">Descrição</div>
      <div class="col-span-2 text-center">Status</div>
      <div class="col-span-4 text-end">Ações</div>
    </div>

    <div class="flex flex-col gap-2 md:gap-0">
      <div
        v-for="route in routes"
        :key="route.id"
        class="group/item relative bg-[var(--color-surface)] md:rounded-none first:md:rounded-t-none last:md:rounded-b-lg rounded-xl border border-transparent md:border-[var(--color-border)] md:border-t-0 first:md:border-t hover:border-[var(--color-primary-border)] hover:bg-[var(--color-primary-soft)] transition-all duration-300 ease-out hover:shadow-sm px-4 py-3 md:px-6 md:py-3 cursor-pointer"
      >
        <div
          class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-[var(--color-primary)] rounded-r-full opacity-0 group-hover/item:h-6 group-hover/item:opacity-100 transition-all duration-300"
        ></div>

        <div
          class="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 items-center"
        >
          <div class="col-span-6 flex items-center gap-3 w-full">
            <div
              class="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center text-[var(--color-primary)] group-hover/item:scale-105 transition-transform duration-200"
            >
              <RouteIcon class="w-4 h-4" />
            </div>
            <div class="flex flex-col gap-0.5">
              <span
                class="font-semibold text-[var(--color-text)] text-sm group-hover/item:text-[var(--color-primary)] transition-colors"
              >
                {{ route.name }}
              </span>
              <div
                class="flex items-center gap-2 text-xs text-[var(--color-text-muted)]"
              >
                <span>{{ route.dateRange }}</span>
                <span
                  class="w-1 h-1 rounded-full bg-[var(--color-text-muted)] opacity-50"
                ></span>
                <span
                  >{{ route.suppliersCount }} fornecedor{{
                    route.suppliersCount !== 1 ? "es" : ""
                  }}</span
                >
              </div>
            </div>
          </div>

          <div class="col-span-2 w-full md:w-auto flex md:justify-center">
            <UiBadge
              :variant="getStatusVariant(route.status)"
              :dot="true"
              size="small"
            >
              {{ getStatusLabel(route.status) }}
            </UiBadge>
          </div>

          <div
            class="col-span-4 w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center justify-end gap-2"
          >
            <UiButton variant="primary" size="small" class="w-full md:w-auto">
              <Plus class="w-3 h-3" />
              Adição rápida
            </UiButton>

            <UiButton variant="secondary" size="small" class="w-full md:w-auto">
              <Eye class="w-3 h-3" />
              Detalhes
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <UiEmptyState
      v-if="routes.length === 0"
      title="Nenhuma rota encontrada"
      description="Crie sua primeira rota para começar a organizar seus fornecedores."
    >
      <template #icon>
        <RouteIcon class="w-12 h-12" />
      </template>
      <template #action>
        <UiButton variant="primary" @click="showNovaRotaModal = true">
          <Plus class="w-4 h-4" />
          Nova Rota
        </UiButton>
      </template>
    </UiEmptyState>

    <ModalNovaRota v-model="showNovaRotaModal" @save="handleRouteCreated" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Plus, Eye, Route as RouteIcon } from "lucide-vue-next";
import UiButton from "@/components/ui/buttons/UiButton.vue";
import UiBadge from "@/components/ui/data-display/UiBadge.vue";
import UiEmptyState from "@/components/ui/feedback/UiEmptyState.vue";
import UiCalendario from "@/components/ui/forms/UiCalendario.vue";
import ModalNovaRota from "../components/ModalNovaRota.vue";

definePageMeta({
  layout: "default",
});

type RouteStatus = "pending" | "cancelled" | "completed";

interface RouteItem {
  id: number;
  name: string;
  dateRange: string;
  suppliersCount: number;
  status: RouteStatus;
}

const showNovaRotaModal = ref(false);
const filtroDataInicio = ref<Date | null>(null);
const filtroDataFim = ref<Date | null>(null);

const routes = ref<RouteItem[]>([
  {
    id: 1,
    name: "Rota dos vinhedos",
    dateRange: "25/04 - 30/04",
    suppliersCount: 3,
    status: "pending",
  },
  {
    id: 2,
    name: "Rota 2",
    dateRange: "25/04 - 30/04",
    suppliersCount: 0,
    status: "cancelled",
  },
  {
    id: 3,
    name: "Rota 91",
    dateRange: "01/06 - 30/06",
    suppliersCount: 3,
    status: "completed",
  },
  {
    id: 4,
    name: "Rota dos vinhedos",
    dateRange: "25/04 - 30/04",
    suppliersCount: 3,
    status: "pending",
  },
]);

const getStatusLabel = (status: RouteStatus): string => {
  const map: Record<RouteStatus, string> = {
    pending: "Pendente",
    cancelled: "Cancelada",
    completed: "Completo",
  };
  return map[status];
};

const getStatusVariant = (status: RouteStatus): string => {
  const map: Record<RouteStatus, string> = {
    pending: "warning",
    cancelled: "danger",
    completed: "success",
  };
  return map[status];
};

const handleDateChange = (value: { start: Date | null; end: Date | null }) => {
  filtroDataInicio.value = value.start;
  filtroDataFim.value = value.end;
};

const handleRouteCreated = () => {
  console.log("Rota criada com sucesso!");
};
</script>

<style scoped>
.group\/item:hover {
  transform: translateY(-1px);
}
</style>
