<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-gray-400/50 z-50 flex items-center justify-center"
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
          <BaseButton @click="$emit('cancel')" class="btn btn-secondary">
            Cancel
          </BaseButton>

          <BaseButton
            @click="$emit('confirm')"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            :disabled="disableFunction"
          >
            Confirm
          </BaseButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "../stores/userStore";
import BaseButton from "./BaseButton.vue";

const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
});
defineEmits(["confirm", "cancel"]);

const userStore = useUserStore();
const disableFunction = computed(() => userStore.disableFunction(props?.title));
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
