<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-white/50 z-50 flex items-center justify-center"
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
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Item Name</label
            >
            <input
              v-model="form.name"
              type="text"
              class="w-full border rounded px-3 py-2"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="text-sm text-red-500 mt-1">
              {{ errors.name }}
            </p>
          </div>

          <!-- Quantity -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Quantity</label
            >
            <input
              v-model="form.quantity"
              type="number"
              class="w-full border rounded px-3 py-2"
              :class="{ 'border-red-500': errors.quantity }"
            />
            <p v-if="errors.quantity" class="text-sm text-red-500 mt-1">
              {{ errors.quantity }}
            </p>
          </div>

          <!-- Date -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Date</label
            >
            <input
              v-model="form.date"
              type="date"
              class="w-full border rounded px-3 py-2"
              :class="{ 'border-red-500': errors.date }"
            />
            <p v-if="errors.date" class="text-sm text-red-500 mt-1">
              {{ errors.date }}
            </p>
          </div>
        </form>

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
              @click="submitForm"
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

<script setup lang="tsx">
interface FormData {
  id?: number;
  name?: string;
  quantity?: string;
  date?: string;
}
import { reactive, ref, watch } from "vue";

const props = defineProps<{
  show: Boolean;
  title: String;
  formData?: FormData;
}>();

const emit = defineEmits(["close", "submit"]);
const today = new Date().toISOString().slice(0, 10);

const form = reactive<FormData>({
  id: props?.formData?.id,
  name: props?.formData?.name,
  quantity: props?.formData?.quantity,
  date: props?.formData?.date ?? today,
});

watch(
  () => props.formData,
  (newVal) => {
    form.name = newVal.name;
    form.quantity = newVal.quantity;
    form.date = newVal.date;
  },
  { deep: true }
);

function submitForm() {
  if (validateForm()) {
    console.log("✅ Submitted:", form);
    emit("submit");
    closeModal();
  } else {
    console.log("❌ Validation failed");
  }
}

const closeModal = () => {
  emit("close");
};

const errors = ref<FormData>({
  name: "",
  quantity: "",
  date: "",
});

function validateForm() {
  console.log("run this");
  errors.value = {};

  if (!form.name.trim()) {
    errors.value.name = "Item name is required.";
  }

  if (!form.quantity || Number(form.quantity) <= 0) {
    errors.value.quantity = "Quantity must be greater than 0.";
  }

  if (!form.date) {
    errors.value.date = "Date is required.";
  }

  return Object.keys(errors.value).length === 0;
}
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
