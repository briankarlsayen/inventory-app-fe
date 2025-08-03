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
import { ref, defineComponent, onMounted, computed } from "vue";
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
    const store = useTableStore();

    const today = new Date().toISOString().slice(0, 10);
    const stockItems = computed(() => store.stockItems);
    const tableHeaders: TableHeader[] = [
      {
        key: "item",
        label: "Item",
        inputType: "select",
        default: "",
        disabled: false,
        options: stockItems.value ?? [],
        rules: [{ required: true, message: "Item is required" }],
      },
      {
        key: "name",
        label: "Name",
        inputType: "text",
        default: "",
        disabled: true,
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

    const handleAddStocks = async (data: any) => {
      // TODO run add stock api
      console.log("add stonks", data.value);
      // const res = await
      // refresh table data
    };

    const handleEditStocks = (data: any) => {
      // TODO run edit stock api
      console.log("edit stonks", data);
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
