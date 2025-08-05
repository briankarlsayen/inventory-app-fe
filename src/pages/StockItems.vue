<template>
  <div class="p-4">
    <h4 class="pt-8 pb-4">Stock Items</h4>
    <BaseTable
      :headers="headers"
      :rows="tableData"
      :perPage="10"
      @add-request="handleAdd"
      @edit-request="handleEdit"
      @delete-request="handleDelete"
    />
  </div>
</template>
<script setup lang="tsx">
import { computed } from "vue";
import { useTableStore, type TableFormFields } from "../stores/tableStore";
import BaseTable from "../components/BaseTable.vue";
import {
  archiveStockItemApi,
  createStockItemApi,
  updateStockItemApi,
} from "../api/api";

const store = useTableStore();
const categories = computed(() => store.categories);

const headers = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "unit",
    label: "Unit",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "reorderLevel",
    label: "Reorder Level",
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
    rules: [
      { required: true, message: "Reorder level is required" },
      {
        validator: (value: string) => Number(value) > 0,
        message: "Reorder level must be greater than 0",
      },
    ],
  },
];

const initialFormDetails = Object.fromEntries(
  tableFormFields?.map(({ key, default: defaultValue }) => [key, defaultValue])
);

store.setInitialFormData(initialFormDetails);
store.setInputFields(tableFormFields);

const tableData = computed(() => store.stockItems);

const handleAdd = async (data: any) => {
  const val = data?.value;
  const formVal = {
    name: val?.name,
    unit: val?.unit,
    reorder_level: val?.reorderLevel,
    category: val?.category?.id,
  };
  const res = await createStockItemApi(formVal);
  if (res?.success) {
    store.initializeStockItems();
  }
};
const handleEdit = async (data: any) => {
  const val = data?.value;
  const formVal = {
    id: val?.id,
    name: val?.name,
    unit: val?.unit,
    reorder_level: val?.reorderLevel,
    category: val?.category?.id,
  };
  const res = await updateStockItemApi(formVal);
  if (res?.success) {
    store.initializeStockItems();
  }
};
const handleDelete = async (id: string) => {
  const res = await archiveStockItemApi(id);
  if (res?.success) {
    store.initializeStockItems();
  }
};
</script>
