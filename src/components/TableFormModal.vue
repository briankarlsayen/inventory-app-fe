<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-gray-400/50 z-50 flex items-center justify-center"
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

        <form @submit.prevent="submitForm">
          <!-- Item Name -->
          <div v-for="item in activeFields" :key="item.key" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{
              item.label
            }}</label>
            <input
              v-if="item.inputType === 'text'"
              v-model="form[item.key]"
              type="text"
              class="w-full border rounded px-3 py-2"
              :class="{ 'border-red-500': errors[item.key] }"
            />
            <select
              id="item"
              v-if="item.inputType === 'select'"
              v-model="form[item.key]"
              class="w-full border rounded px-3 py-2"
              :class="{ 'border-red-500': errors[item.key] }"
            >
              <option
                v-for="option in item.options"
                :key="typeof option === 'string' ? option : option.id"
                :value="
                  typeof option === 'string'
                    ? option
                    : { id: option?.id, name: option?.name }
                "
              >
                {{ typeof option === "string" ? option : option.name }}
              </option>
            </select>
            <input
              v-if="item.inputType === 'number'"
              v-model="form[item.key]"
              type="number"
              class="w-full border rounded px-3 py-2"
              :class="{ 'border-red-500': errors[item.key] }"
            />
            <input
              v-else-if="item.inputType === 'date'"
              v-model="form[item.key]"
              type="date"
              class="w-full border rounded px-3 py-2"
              :class="{ 'border-red-500': errors[item.key] }"
            />
            <p v-if="errors[item.key]" class="text-sm text-red-500 mt-1">
              {{ errors[item.key] }}
            </p>
          </div>
        </form>

        <!-- Footer slot (optional submit buttons) -->
        <div class="mt-4 text-right">
          <slot name="footer">
            <div class="flex flex-row-reverse gap-2">
              <BaseButton
                type="submit"
                class="btn btn-primary"
                :loading="isLoading"
                @click="submitForm"
              >
                Submit
              </BaseButton>
              <BaseButton
                :disabled="isLoading"
                @click="$emit('close')"
                class="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </BaseButton>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="tsx">
import { computed } from "vue";
import { useTableStore } from "../stores/tableStore";
import BaseButton from "./BaseButton.vue";

defineProps<{
  show: Boolean;
  title: String;
}>();

const emit = defineEmits(["close", "submit"]);
const store = useTableStore();
const isLoading = computed(() => store.isTableModalLoading);
const form = computed(() => store.formData);
const inputFields = computed(() => store.inputFields);
const activeFields = computed(() =>
  inputFields.value.filter((item) => !item.disabled)
);

function submitForm() {
  const validate = store.validateForm(form.value);
  if (validate) {
    emit("submit");
  } else {
    console.log("❌ Validation failed");
  }
}

const errors = computed(() => store.errors);
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
