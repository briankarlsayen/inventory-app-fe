<template>
  <div class="p-4">
    <h4 class="pt-8 pb-4">Stocks</h4>
    <BaseTable
      :headers="tableHeaders"
      :rows="tableData"
      :perPage="10"
      @row-click="handleRowClick"
      @add-request="handleAddStocks"
      @edit-request="handleEditStocks"
      @delete-request="handleDeleteStocks"
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
      { key: "name", label: "Name" },
      { key: "quantity", label: "Quantity" },
      { key: "date", label: "Date" },
    ];

    const tableData = [
      { id: 1, name: "Espresso Beans", quantity: 20, date: "2025-07-25" },
      { id: 2, name: "Milk Frother", quantity: 10, date: "2025-07-24" },
      { id: 3, name: "Coffee Filters", quantity: 100, date: "2025-07-23" },
      { id: 4, name: "Iced Cups", quantity: 200, date: "2025-07-22" },
      { id: 5, name: "Syrup Vanilla", quantity: 15, date: "2025-07-21" },
      { id: 6, name: "Espresso Machine", quantity: 3, date: "2025-07-20" },
      { id: 7, name: "Mugs", quantity: 35, date: "2025-07-19" },
      { id: 8, name: "Napkins", quantity: 500, date: "2025-07-18" },
      { id: 9, name: "Coffee Stirrers", quantity: 250, date: "2025-07-17" },
      { id: 10, name: "Chocolate Powder", quantity: 8, date: "2025-07-16" },
      { id: 11, name: "Whipped Cream", quantity: 12, date: "2025-07-15" },
      { id: 12, name: "Green Tea Bags", quantity: 30, date: "2025-07-14" },
      { id: 13, name: "Lids", quantity: 150, date: "2025-07-13" },
      { id: 14, name: "Cold Brew Bottles", quantity: 20, date: "2025-07-12" },
      { id: 15, name: "Sugar Packets", quantity: 300, date: "2025-07-11" },
    ];

    const handleRowClick = (row) => {
      console.log("Row clicked:", row);
    };

    const handleAddStocks = () => {
      // TODO run add stock api
      console.log("add stonks");
    };

    const handleEditStocks = () => {
      // TODO run edit stock api
      console.log("edit stonks");
    };

    const handleDeleteStocks = () => {
      // TODO run delete stock api
      console.log("delete stonks");
    };

    return {
      tableData,
      tableHeaders,
      handleRowClick,
      handleAddStocks,
      handleEditStocks,
      handleDeleteStocks,
    };
  },
});
</script>
