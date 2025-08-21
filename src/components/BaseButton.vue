<template>
  <div :class="containerClass">
    <button :type="type" :disabled="loading || disabled" :class="computedClass">
      <slot />
      <svg
        v-if="loading"
        class="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
        ></path>
      </svg>
    </button>
    <div
      v-if="disabled"
      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow"
    >
      Disabled
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  class: string;
  type?: "button" | "submit" | "reset";
  full?: boolean;
}>();

const containerClass = props?.full
  ? "relative group w-full"
  : "relative group inline-block";

const baseClass =
  "rounded-md flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const computedClass = computed(() => {
  return `${baseClass} ${props.class}`;
});
</script>
