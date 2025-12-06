<template>
  <div
    class="min-h-screen p-6 pb-20 transition-colors"
    style="background-color: var(--color-background); color: var(--color-text)"
  >
    <h1 class="text-2xl font-bold mb-6">Fornecedores</h1>
    <!-- Header Controls -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
    >
      <!-- Search and Filter Toggle -->
      <div class="flex items-center gap-2 w-full md:max-w-xl">
        <div class="relative flex-1">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            style="color: var(--color-text-muted)"
          />
          <input
            v-model="search"
            type="text"
            placeholder="Pesquise o Fornecedor"
            class="w-full rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all border"
            style="
              background-color: var(--color-surface);
              border-color: var(--color-border);
              color: var(--color-text);
            "
          />
        </div>

        <button
          class="p-2.5 rounded-lg border transition-colors relative"
          :style="[
            showFilters
              ? {
                  backgroundColor: 'var(--color-primary)',
                  borderColor: 'var(--color-primary)',
                  color: '#fff',
                }
              : {
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-muted)',
                },
          ]"
          @click="showFilters = !showFilters"
        >
          <Filter class="w-5 h-5" />
          <span
            v-if="activeFiltersCount > 0"
            class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900"
          ></span>
        </button>
      </div>

      <!-- View Toggle -->
      <div
        class="flex items-center rounded-lg p-1 border self-start md:self-auto"
        style="
          background-color: var(--color-surface);
          border-color: var(--color-border);
        "
      >
        <button
          class="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all"
          :style="[
            viewMode === 'list'
              ? {
                  backgroundColor: 'var(--color-hover)',
                  color: 'var(--color-text)',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                }
              : { color: 'var(--color-text-muted)' },
          ]"
          @click="viewMode = 'list'"
        >
          <List class="w-4 h-4" />
          Lista
        </button>
        <button
          class="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all"
          :style="[
            viewMode === 'map'
              ? {
                  backgroundColor: 'var(--color-hover)',
                  color: 'var(--color-text)',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                }
              : { color: 'var(--color-text-muted)' },
          ]"
          @click="viewMode = 'map'"
        >
          <Map class="w-4 h-4" />
          Mapa
        </button>
      </div>
    </div>

    <!-- Collapsible Filters -->
    <div v-show="showFilters" class="mb-6">
      <SupplierFilters v-model="filters" />
    </div>

    <!-- Content -->
    <div>
      <div v-if="viewMode === 'list'">
        <div
          class="mb-4 font-semibold text-sm"
          style="color: var(--color-primary)"
        >
          {{ filteredSuppliers.length }} resultados
        </div>
        <SupplierList :suppliers="filteredSuppliers" />

        <!-- Pagination Placeholder -->
        <div class="mt-6 flex justify-center gap-2">
          <button
            class="w-8 h-8 flex items-center justify-center rounded-lg border transition-colors"
            style="
              background-color: var(--color-surface);
              border-color: var(--color-border);
              color: var(--color-text-muted);
            "
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-lg font-bold"
            style="background-color: var(--color-primary); color: #fff"
          >
            1
          </button>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-lg border transition-colors"
            style="
              background-color: var(--color-surface);
              border-color: var(--color-border);
              color: var(--color-text-muted);
            "
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div v-else>
        <SupplierMap />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Search,
  Filter,
  List,
  Map,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import SupplierList from "../components/SupplierList.vue";
import SupplierMap from "../components/SupplierMap.vue";
import SupplierFilters from "../components/SupplierFilters.vue";
import { mockSuppliers } from "../mocks/suppliers";

definePageMeta({ layout: "default" });

const { fetchFornecedor } = useFornecedorService();

const { data: fornecedores } = await fetchFornecedor();

console.log(fornecedores);

const search = ref("");
const showFilters = ref(false);
const viewMode = ref<"list" | "map">("list");

const filters = ref({
  fantasia: "",
  cidade: "",
  status: "todos",
  sortBy: "fornecedor",
});

const activeFiltersCount = computed(() => {
  let count = 0;
  if (filters.value.fantasia) count++;
  if (filters.value.cidade) count++;
  if (filters.value.status !== "todos") count++;
  if (filters.value.sortBy !== "fornecedor") count++;
  return count;
});

const filteredSuppliers = computed(() => {
  return mockSuppliers.filter((s) => {
    const searchMatch =
      !search.value ||
      s.name.toLowerCase().includes(search.value.toLowerCase()) ||
      (s.fantasy &&
        s.fantasy.toLowerCase().includes(search.value.toLowerCase()));

    const fantasiaMatch =
      !filters.value.fantasia ||
      (s.fantasy &&
        s.fantasy.toLowerCase().includes(filters.value.fantasia.toLowerCase()));
    const cidadeMatch =
      !filters.value.cidade ||
      s.city.toLowerCase().includes(filters.value.cidade.toLowerCase());

    const statusMatch =
      filters.value.status === "todos" ||
      (filters.value.status === "ativo" && s.status === "active") ||
      (filters.value.status === "inativo" && s.status === "inactive");

    return searchMatch && fantasiaMatch && cidadeMatch && statusMatch;
  });
});
</script>
