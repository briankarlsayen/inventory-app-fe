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
import BaseTable from "../components/BaseTable.vue";
const tableHeaders = [
  { key: "name", label: "Name" },
  { key: "quantity", label: "Quantity" },
  { key: "date", label: "Date" },
];

const tableData = [
  { name: "Espresso Beans", quantity: 20, date: "2025-07-25" },
  { name: "Milk Frother", quantity: 10, date: "2025-07-24" },
  { name: "Coffee Filters", quantity: 100, date: "2025-07-23" },
  { name: "Iced Cups", quantity: 200, date: "2025-07-22" },
  { name: "Syrup Vanilla", quantity: 15, date: "2025-07-21" },
  { name: "Espresso Machine", quantity: 3, date: "2025-07-20" },
  { name: "Mugs", quantity: 35, date: "2025-07-19" },
  { name: "Napkins", quantity: 500, date: "2025-07-18" },
  { name: "Coffee Stirrers", quantity: 250, date: "2025-07-17" },
  { name: "Chocolate Powder", quantity: 8, date: "2025-07-16" },
  { name: "Whipped Cream", quantity: 12, date: "2025-07-15" },
  { name: "Green Tea Bags", quantity: 30, date: "2025-07-14" },
  { name: "Lids", quantity: 150, date: "2025-07-13" },
  { name: "Cold Brew Bottles", quantity: 20, date: "2025-07-12" },
  { name: "Sugar Packets", quantity: 300, date: "2025-07-11" },
];
const handleRowClick = (row) => {
  console.log("Row clicked:", row);
};
</script>
<style scoped></style>
