<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center gap-1 md:gap-2">
    <button
      class="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-md transition-all duration-200"
      :class="page === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[var(--color-hover)]'"
      :disabled="page === 1"
      @click="goToPage(page - 1)"
    >
      <ChevronLeft class="w-4 h-4 text-[var(--color-text-muted)]" />
    </button>

    <button
      v-for="pageNumber in visiblePages"
      :key="pageNumber"
      class="w-8 h-8 md:w-9 md:h-9 rounded-md text-xs md:text-sm font-medium transition-all duration-200"
      :class="[
        pageNumber === page
          ? 'bg-[var(--color-primary)] text-white'
          : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
      ]"
      @click="goToPage(pageNumber)"
    >
      {{ pageNumber }}
    </button>

    <button
      class="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-md transition-all duration-200"
      :class="page === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[var(--color-hover)]'"
      :disabled="page === totalPages"
      @click="goToPage(page + 1)"
    >
      <ChevronRight class="w-4 h-4 text-[var(--color-text-muted)]" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

interface Props {
  page: number;
  totalPages: number;
  maxVisible?: number;
  totalItems?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisible: 3,
});

const emit = defineEmits<{
  "update:page": [value: number];
}>();

const visiblePages = computed(() => {
  const pages: number[] = [];
  const half = Math.floor(props.maxVisible / 2);

  let start = Math.max(1, props.page - half);
  let end = Math.min(props.totalPages, start + props.maxVisible - 1);

  if (end - start + 1 < props.maxVisible) {
    start = Math.max(1, end - props.maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("update:page", page);
  }
};
</script>
