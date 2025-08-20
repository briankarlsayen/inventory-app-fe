<template>
  <div class="p-4">
    <h4 class="pt-8 pb-4">Orders</h4>
    <BaseTable
      :headers="headers"
      :rows="tableData"
      :perPage="10"
      @add-request="handleAdd"
      @edit-request="handleEdit"
      @delete-request="handleDelete"
      :isOrderForm="true"
    />
  </div>
</template>
<script setup lang="tsx">
import { computed } from "vue";
import { useTableStore } from "../stores/tableStore";
import BaseTable from "../components/BaseTable.vue";
import { archiveOrderApi, createOrderApi, updateOrderApi } from "../api/api";

const store = useTableStore();

const headers = [
  {
    key: "date",
    label: "Date",
  },
  {
    key: "totalAmount",
    label: "Total Amount",
  },
  {
    key: "paymentType",
    label: "Payment Type",
  },
];

const today = new Date().toISOString().slice(0, 10);

const initialFormDetails = {
  products: [],
  paymentType: "cash",
  totalPayment: 0,
  date: today,
};

store.setInitialFormData(initialFormDetails);

const tableData = computed(() => store.orders);

const formatFormData = (data) => {
  const val = data.value;
  const formatProducts = val.products.map((item: any) => {
    return {
      product: item?.id,
      quantity: item?.quantity,
      purchase_price: item?.purchasePrice,
    };
  });
  return {
    id: val?.id,
    products: formatProducts,
    total_amount: val?.totalPayment,
    payment_type: val?.paymentType,
    date: val?.date,
  };
};

const handleAdd = async (data: any) => {
  store.setLoadingState(true);
  const formData = formatFormData(data);
  const res = await createOrderApi(formData);
  if (res?.success) {
    store.initializeOrders();
  }
  store.setLoadingState(false);
  store.setModalState(false);
};
const handleEdit = async (data: any) => {
  store.setLoadingState(true);
  const formVal = formatFormData(data);
  const res = await updateOrderApi(formVal);
  if (res?.success) {
    store.initializeOrders();
  }
  store.setLoadingState(false);
  store.setModalState(false);
};
const handleDelete = async (id: string) => {
  store.setLoadingState(true);
  const res = await archiveOrderApi(id);
  if (res?.success) {
    store.initializeOrders();
  }
  store.setLoadingState(false);
  store.setModalState(false);
};
</script>
