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
          <MultiSelect
            v-model="selectedList"
            :options="products"
            @select="handleSelectOption"
          />
          <div v-if="selectedList?.length">
            <!-- product form -->
            <div class="pb-6">
              <div class="grid grid-cols-12 gap-2 w-full pb-4">
                <div></div>
                <div class="col-span-5">
                  <span>Item</span>
                </div>
                <div class="col-span-3">
                  <span>Quantity</span>
                </div>
                <div class="col-span-3 text-end">
                  <span>Amount</span>
                </div>
              </div>
              <div
                v-for="item in selectedProducts.products"
                :key="item"
                class="grid grid-cols-12 gap-4 w-full pt-2 items-center pb-2"
              >
                <div>
                  <button
                    type="button"
                    @click="() => removeItem(item)"
                    class="text-red-500 hover:text-red-700 cursor-pointer"
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
                <div class="col-span-3 text-end">
                  {{ item?.purchasePrice }}
                </div>
              </div>
            </div>
            <hr />
            <div class="pt-8 flex flex-col gap-2">
              <div class="grid grid-cols-6">
                <p class="col-span-4">Date</p>
                <div class="col-span-2">
                  <input
                    v-model="date"
                    type="date"
                    class="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div class="grid grid-cols-4 pt-4">
                <p class="col-span-3 items-center">Payment</p>
                <select
                  id="item"
                  v-model="paymentField"
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
              <div class="grid grid-cols-4 pt-4">
                <p class="col-span-3">Total</p>
                <p class="col-span-1 text-end">{{ totalPrice }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center p-4">
            <p>Please add items on order form</p>
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

            <BaseButton
              class="btn btn-primary w-full"
              type="submit"
              :loading="isLoading"
              @click="submitForm"
            >
              Submit
            </BaseButton>
            <!-- <button
              type="submit"
              @click="submitForm"
              class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button> -->
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
import BaseButton from "./BaseButton.vue";

interface ISelectedProduct {
  id?: string;
  date: string;
  paymentType: "cash" | "gcash";
  products: any[];
  totalAmount: number;
}

defineProps<{
  show: Boolean;
  title: String;
}>();

const emit = defineEmits(["close", "submit"]);

const store = useTableStore();

const products = computed(() => store.products);
const isLoading = ref(false);

const selectedProducts = computed<ISelectedProduct>(() => store?.formData);
const selectedList = computed({
  get: () => store.selectProductIds,
  set: (val) => {
    store.selectProductIds = val;
  },
});
const totalPrice = computed(() =>
  selectedProducts.value.products.reduce(
    (sum, item) => sum + (item.purchasePrice || 0),
    0
  )
);

const paymentField = computed({
  get: () => store?.formData?.paymentType,
  set: (val) => {
    store.formData.paymentType = val;
  },
});
const paymentList = ["cash", "gcash"];

const today = new Date().toISOString().slice(0, 10);

const date = ref(today);

function submitForm() {
  const formatProducts = selectedProducts.value.products.map((item) => {
    return {
      product: item?.id,
      quantity: item?.quantity,
      purchase_price: item?.purchasePrice,
    };
  });
  const submitForm = {
    id: selectedProducts?.value?.id,
    products: formatProducts,
    total_amount: totalPrice?.value,
    payment_type: paymentField?.value,
    date: date?.value,
  };
  store.formData = submitForm;
  emit("submit");
  closeModal();
}

const closeModal = () => {
  emit("close");
};

const displayLabel = (id: string) => {
  const data = selectedProducts?.value.products.find((item) => item.id === id);
  return data?.size ? `${data?.name} ${data?.size}` : data?.name;
};

const handleSelectOption = (props: any) => {
  const form = {
    ...props,
    quantity: 1,
    purchasePrice: props?.price,
  };
  store.formData.products = [...selectedProducts.value.products, form];
};

const handleInput = (id: string) => {
  const fieldVal = selectedProducts?.value.products.find(
    (item) => item.id === id
  );
  fieldVal["purchasePrice"] = fieldVal?.quantity * fieldVal?.price;

  store.formData.products = selectedProducts.value.products.map((item) =>
    item.id === id ? { ...item, ...fieldVal } : item
  );
};

const errors = computed(() => store.errors);

const removeItem = (props: ISelectedProduct) => {
  store.formData.products = selectedProducts.value.products.filter(
    (item) => item.id !== props?.id
  );

  selectedList.value = selectedList.value.filter((item) => item !== props?.id);
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
