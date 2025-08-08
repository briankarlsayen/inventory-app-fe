<template>
  <div class="p-4">
    <h4 class="pt-8 pb-4">Products</h4>
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
  archiveProductApi,
  createProductApi,
  updateProductApi,
} from "../api/api";

const store = useTableStore();

const headers = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "type",
    label: "Type",
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
    key: "size",
    label: "Size",
    default: "",
    inputType: "select",
    options: ["", "8oz", "12oz"],
    rules: [],
  },
  {
    key: "price",
    label: "Price",
    default: "",
    inputType: "number",
    rules: [
      { required: false, message: "Price is required" },
      {
        validator: (value: string) => Number(value) > 0,
        message: "Price must be greater than 0",
      },
    ],
  },
  {
    key: "type",
    label: "Type",
    default: "",
    inputType: "select",
    options: ["pastry", "drink", "others"],
    rules: [{ required: true, message: "Type is required" }],
  },
  {
    key: "description",
    label: "Description",
    default: "",
    inputType: "text",
    rules: [],
  },
];

const initialFormDetails = Object.fromEntries(
  tableFormFields?.map(({ key, default: defaultValue }) => [key, defaultValue])
);

store.setInitialFormData(initialFormDetails);
store.setInputFields(tableFormFields);

const tableData = computed(() => store.products);

const handleAdd = async (data: any) => {
  const val = data?.value;
  const formVal = {
    name: val?.name,
    size: val?.size,
    price: val?.price,
    type: val?.type,
    description: val?.description,
  };
  const res = await createProductApi(formVal);
  if (res?.success) {
    store.initializeProducts();
  }
};
const handleEdit = async (data: any) => {
  const val = data?.value;
  const formVal = {
    id: val?.id,
    name: val?.name,
    size: val?.size,
    price: val?.price,
    type: val?.type,
    description: val?.description,
  };
  const res = await updateProductApi(formVal);
  if (res?.success) {
    store.initializeProducts();
  }
};
const handleDelete = async (id: string) => {
  const res = await archiveProductApi(id);
  if (res?.success) {
    store.initializeProducts();
  }
};
</script>
