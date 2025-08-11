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
import { useTableStore, type TableFormFields } from "../stores/tableStore";
import BaseTable from "../components/BaseTable.vue";
import { archiveOrderApi, createOrderApi, updateOrderApi } from "../api/api";

const store = useTableStore();
const categories = computed(() => store.categories);

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

const tableFormFields: TableFormFields[] = [
  {
    key: "name",
    label: "Name",
    default: "",
    inputType: "text",
    rules: [{ required: true, message: "Name is required" }],
  },
  {
    key: "unit",
    label: "Unit",
    default: "",
    inputType: "text",
    rules: [{ required: true, message: "Unit is required" }],
  },
  {
    key: "category",
    label: "Category",
    default: "",
    inputType: "select",
    options: categories?.value ?? [],
    rules: [{ required: true, message: "Category is required" }],
  },
  {
    key: "reorderLevel",
    label: "Reorder Level",
    default: "0",
    inputType: "number",
    rules: [],
  },
];

const initialFormDetails = {
  products: [],
  paymentType: "cash",
  totalPayment: 0,
};

store.setInitialFormData(initialFormDetails);
store.setInputFields(tableFormFields);

const tableData = computed(() => store.orders);

const handleAdd = async (data: any) => {
  const res = await createOrderApi(data?.value);
  if (res?.success) {
    store.initializeOrders();
  }
  return;
};
const handleEdit = async (data: any) => {
  const formVal = data?.value;
  const res = await updateOrderApi(formVal);
  if (res?.success) {
    store.initializeOrders();
  }
};
const handleDelete = async (id: string) => {
  const res = await archiveOrderApi(id);
  if (res?.success) {
    store.initializeOrders();
  }
};
</script>
