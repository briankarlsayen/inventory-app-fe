<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-white/50 z-50 flex items-center justify-center"
    >
      <div
        class="bg-white rounded-xl shadow-lg w-full max-w-xl mx-4 p-6 relative"
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

        <form>
          <!-- Item Name -->
          <!-- <SearchableSelect
            v-model="selectedId"
            :options="options"
            placeholder="Choose an item..."
          /> -->

          <!-- <SearchableDropdown v-model="selected" :options="options" /> -->
          <MultiSelect
            v-model="selectedList"
            :options="products"
            @select="handleSelectOption"
          />
          <div class="grid grid-cols-12 gap-2 w-full pt-4">
            <div></div>
            <div class="col-span-5">
              <h4>Item</h4>
            </div>
            <div class="col-span-3">
              <h4>Quantity</h4>
            </div>
            <div class="col-span-3">
              <h4>Amount</h4>
            </div>
          </div>
          <hr />
          <div
            v-for="item in formFields"
            :key="item"
            class="grid grid-cols-12 gap-4 w-full pt-2 pb-2"
          >
            <div>
              <button
                type="button"
                @click="() => removeItem(item)"
                class="text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </div>
            <div class="col-span-5">{{ displayLabel(item?.id) }}</div>
            <div class="col-span-3">
              <input
                v-model="item.quantity"
                @input="handleInput(item?.id)"
                type="number"
                class="w-full border rounded px-3 py-2"
                :class="{ 'border-red-500': errors[item.key] }"
              />
            </div>
            <div class="col-span-3">
              {{ item?.purchasePrice }}
            </div>
          </div>
          <hr />
          <div class="grid grid-cols-4 pt-4 pb-4">
            <h4 class="col-span-3">Total</h4>
            <p class="col-span-1">12345</p>
          </div>
          <div class="grid grid-cols-4 pt-4 pb-4">
            <p class="col-span-3">Payment</p>
            <select
              id="item"
              v-model="paymentField"
              type="text"
              class="w-full border rounded px-3 py-2 col-span-1"
            >
              <option
                v-for="option in paymentList"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
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
              type="submit"
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
import { computed, ref } from "vue";
import { useTableStore } from "../stores/tableStore";
import MultiSelect from "./MultiSelect.vue";

defineProps<{
  show: Boolean;
  title: String;
}>();

const emit = defineEmits(["close", "submit"]);

const store = useTableStore();
const form = computed(() => store.formData);
const inputFields = computed(() => store.inputFields);
const products = computed(() => store.products);

const selectedList = ref([]);
const formFields = ref([]);
const paymentField = ref("gcash");
const paymentList = ["gcash", "cash"];

function submitForm() {
  const validate = store.validateForm(form.value);
  if (validate) {
    emit("submit");
    closeModal();
  } else {
    console.log("❌ Validation failed");
  }
}

const closeModal = () => {
  emit("close");
};

const displayLabel = (id: string) => {
  const data = formFields?.value.find((item) => item.id === id);
  return data?.size ? `${data?.name} ${data?.size}` : data?.name;
};

const handleSelectOption = (props: any) => {
  const form = {
    ...props,
    quantity: 1,
    purchasePrice: props?.price,
  };
  formFields.value = [...formFields.value, form];
  console.log("select", props);
};

const handleInput = (id: string) => {
  const fieldVal = formFields?.value.find((item) => item.id === id);
  fieldVal["purchasePrice"] = fieldVal?.quantity * fieldVal?.price;

  formFields.value = formFields.value.map((item) =>
    item.id === id ? { ...item, ...fieldVal } : item
  );
};

const errors = computed(() => store.errors);

const removeItem = (props) => {
  formFields.value = formFields.value.filter((item) => item.id !== props?.id);
  selectedList.value.filter((item) => item !== props?.id);
  //   console.log("remove", id?.id);
};
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
