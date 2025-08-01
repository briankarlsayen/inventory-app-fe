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
import { ref, computed, defineComponent, onMounted } from "vue";
import BaseTable from "../components/BaseTable.vue";
import { getStocksApi } from "../api/api";
import { utcToLocaleDate } from "../utlis";
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
      { key: "type", label: "Type" },
    ];

    const tableData = ref([]);

    onMounted(async () => {
      const res = await getStocksApi();
      const formattedData = res?.data.map((item) => {
        return {
          id: item?.id,
          name: item?.item_details?.name,
          quantity: item?.quantity,
          date: utcToLocaleDate(item?.date),
          type: item?.type,
        };
      });
      tableData.value = formattedData;
      console.log("res", res);
    });

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
