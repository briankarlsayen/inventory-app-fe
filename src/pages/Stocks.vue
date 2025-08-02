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

<script lang="tsx">
import { ref, defineComponent, onMounted } from "vue";
import BaseTable from "../components/BaseTable.vue";
import { getStocksApi } from "../api/api";
import { utcToLocaleDate } from "../utlis";
import type { TableHeader } from "../components/BaseTable.vue";
import { useTableStore } from "../stores/tableStore";
export default defineComponent({
  name: "Stocks",
  components: {
    BaseTable,
  },
  setup() {
    const today = new Date().toISOString().slice(0, 10);
    const tableHeaders: TableHeader[] = [
      {
        key: "name",
        label: "Name",
        inputType: "text",
        default: "",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        key: "quantity",
        label: "Quantity",
        inputType: "text",
        default: "",
        rules: [
          { required: true, message: "Quantity is required" },
          {
            validator: (value: string) => Number(value) > 0,
            message: "Quantity must be greater than 0",
          },
        ],
      },
      {
        key: "date",
        label: "Date",
        inputType: "text",
        default: today,
        rules: [{ required: true, message: "Date is required" }],
      },
      {
        key: "type",
        label: "Type",
        inputType: "text",
        default: "",
        rules: [{ required: true, message: "Type is required" }],
      },
    ];

    const store = useTableStore();
    const initialFormDetails = Object.fromEntries(
      tableHeaders?.map(({ key, default: defaultValue }) => [key, defaultValue])
    );
    store.setInitialFormData(initialFormDetails);
    store.setInputFields(tableHeaders);

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
