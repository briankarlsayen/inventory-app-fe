<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-white/50 z-50 flex items-center justify-center"
    >
      <div class="bg-white w-full max-w-sm mx-4 p-6 rounded-lg shadow-xl">
        <!-- Title -->
        <h2 class="text-lg font-semibold text-gray-800 mb-3">
          {{ title || "Are you sure?" }}
        </h2>

        <!-- Message -->
        <p class="text-gray-600 mb-5">
          {{ message || "This action cannot be undone." }}
        </p>

        <!-- Actions -->
        <div class="flex justify-end space-x-3">
          <button
            @click="$emit('cancel')"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String,
});
defineEmits(["confirm", "cancel"]);
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
