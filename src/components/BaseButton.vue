<template>
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
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  class: string;
  type?: "button" | "submit" | "reset";
}>();

const baseClass =
  "rounded-md flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const computedClass = computed(() => {
  return `${baseClass} ${props.class}`;
});
</script>
