<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    >
      <div
        class="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6 relative"
      >
        <!-- Close button -->
        <button
          @click="$emit('close')"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <!-- Title -->
        <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>

        <!-- Form slot -->
        <slot />

        <!-- Footer slot (optional submit buttons) -->
        <div class="mt-4 text-right">
          <slot name="footer">
            <button
              @click="$emit('close')"
              class="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 mr-2"
            >
              Cancel
            </button>
            <button
              @click="$emit('submit')"
              class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: {
    type: String,
    default: "Form",
  },
});
defineEmits(["close", "submit"]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
