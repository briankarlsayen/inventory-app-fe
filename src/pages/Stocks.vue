<template>
  <div class="p-4">
    <h4 class="pt-8 pb-4">Stocks</h4>
    <BaseTable
      :headers="tableHeaders"
      :rows="tableData"
      :perPage="10"
      @row-click="handleRowClick"
    />
  </div>
</template>

<script>
import { ref, computed, defineComponent } from "vue";
import BaseTable from "../components/BaseTable.vue";
export default defineComponent({
  name: "Stocks",
  components: {
    BaseTable,
  },
  setup() {
    const tableHeaders = [
      { key: "item", label: "Item" },
      { key: "quantity", label: "Quantity" },
      { key: "date", label: "Date" },
    ];

    const tableData = [
      { item: "Espresso Beans", quantity: 20, date: "2025-07-25" },
      { item: "Milk Frother", quantity: 10, date: "2025-07-24" },
      { item: "Coffee Filters", quantity: 100, date: "2025-07-23" },
      { item: "Iced Cups", quantity: 200, date: "2025-07-22" },
      { item: "Syrup Vanilla", quantity: 15, date: "2025-07-21" },
      { item: "Espresso Machine", quantity: 3, date: "2025-07-20" },
      { item: "Mugs", quantity: 35, date: "2025-07-19" },
      { item: "Napkins", quantity: 500, date: "2025-07-18" },
      { item: "Coffee Stirrers", quantity: 250, date: "2025-07-17" },
      { item: "Chocolate Powder", quantity: 8, date: "2025-07-16" },
      { item: "Whipped Cream", quantity: 12, date: "2025-07-15" },
      { item: "Green Tea Bags", quantity: 30, date: "2025-07-14" },
      { item: "Lids", quantity: 150, date: "2025-07-13" },
      { item: "Cold Brew Bottles", quantity: 20, date: "2025-07-12" },
      { item: "Sugar Packets", quantity: 300, date: "2025-07-11" },
    ];

    const handleRowClick = (row) => {
      console.log("Row clicked:", row);
    };

    return { tableData, tableHeaders, handleRowClick };
  },
});
</script>
