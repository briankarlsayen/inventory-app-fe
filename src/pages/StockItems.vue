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
import { onMounted, ref } from "vue";
import BaseTable from "../components/BaseTable.vue";
import { getStockItemsApi } from "../api/api";

interface SampleTableHeader {
  key: string;
  label: string;
  inputType: "text" | "autocomplete" | "date" | "numeric";
}

const tableHeaders = [
  { key: "name", label: "Name" },
  { key: "unit", label: "Unit" },
  { key: "category", label: "Category" },
  { key: "reorderLevel", label: "Reorder Level" },
];

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
    console.log("res", res);
  }
});

const handleRowClick = (row) => {
  console.log("Row clicked:", row);
};
</script>
<style scoped></style>
