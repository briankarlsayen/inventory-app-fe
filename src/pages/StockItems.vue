<template>
  <div class="p-4">
    <h4 class="pt-8 pb-4">Stock Items</h4>
    <BaseTable
      :headers="tableHeaders"
      :rows="tableData"
      :perPage="10"
      @row-click="handleRowClick"
    />
  </div>
</template>
<script setup lang="tsx">
import { computed, onMounted, ref } from "vue";
import BaseTable, { type TableHeader } from "../components/BaseTable.vue";
import { getStockItemsApi } from "../api/api";
import { useTableStore } from "../stores/tableStore";

const tableHeaders: TableHeader[] = [
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
    inputType: "text",
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

const store = useTableStore();

const initialFormDetails = Object.fromEntries(
  tableHeaders?.map(({ key, default: defaultValue }) => [key, defaultValue])
);

store.setInitialFormData(initialFormDetails);
store.setInputFields(tableHeaders);
const categories = computed(() => store.categories);
console.log("categories", categories.value);
const tableData = ref([]);

onMounted(async () => {
  const res = await getStockItemsApi();
  if (res?.success) {
    const formatData = res?.data.map((item) => {
      return {
        id: item?.id,
        name: item?.name,
        reorderLevel: item?.reorder_level,
        category: item?.category_details?.name,
        unit: item?.unit,
      };
    });
    tableData.value = formatData;
  }
});

const handleRowClick = (row) => {
  console.log("Row clicked:", row);
};

const handleAddItems = async (data: any) => {};
</script>
<style scoped></style>
