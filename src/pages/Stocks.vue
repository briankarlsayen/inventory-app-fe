<template>
  <div class="p-4">
    <h4 class="pt-8 pb-4">Stocks</h4>
    <BaseTable
      :headers="headers"
      :rows="tableData"
      :perPage="10"
      @add-request="handleAddStocks"
      @edit-request="handleEditStocks"
      @delete-request="handleDeleteStocks"
    />
  </div>
</template>

<script lang="tsx">
import { defineComponent, computed } from "vue";
import BaseTable from "../components/BaseTable.vue";
import { archiveStockApi, createStockApi, updateStockApi } from "../api/api";
import { useTableStore, type TableFormFields } from "../stores/tableStore";
export default defineComponent({
  name: "Stocks",
  components: {
    BaseTable,
  },
  setup() {
    const store = useTableStore();

    const today = new Date().toISOString().slice(0, 10);
    const stockItems = computed(() => store.stockItems);
    const headers = [
      {
        key: "item",
        label: "Item",
      },
      {
        key: "quantity",
        label: "Quantity",
      },
      {
        key: "date",
        label: "Date",
      },
      {
        key: "type",
        label: "Type",
      },
    ];
    const tableFormFields: TableFormFields[] = [
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
        inputType: "date",
        default: today,
        rules: [{ required: true, message: "Date is required" }],
      },
      {
        key: "type",
        label: "Type",
        inputType: "select",
        default: "entry",
        options: ["usage", "entry"],
        rules: [{ required: true, message: "Type is required" }],
      },
    ];

    const initialFormDetails = Object.fromEntries(
      tableFormFields?.map(({ key, default: defaultValue }) => [
        key,
        defaultValue,
      ])
    );
    store.setInitialFormData(initialFormDetails);
    store.setInputFields(tableFormFields);

    const tableData = computed(() => store.stocks);
    const handleAddStocks = async (data: any) => {
      store.setLoadingState(true);
      const formVal = {
        ...data.value,
        item: data?.value?.item?.id,
      };
      const res = await createStockApi(formVal);
      if (res?.success) {
        await store.fetchStocks();
      }
      store.clearFields();
      store.setLoadingState(false);
      store.setModalState(false);
    };

    const handleEditStocks = async (data: any) => {
      store.setLoadingState(true);
      const formVal = {
        ...data.value,
        item: data?.value?.item?.id,
      };
      const res = await updateStockApi(formVal);
      if (res?.success) {
        store.fetchStocks();
      }
      store.clearFields();
      store.setLoadingState(false);
      store.setModalState(false);
    };

    const handleDeleteStocks = async (id: string) => {
      store.setLoadingState(true);
      const res = await archiveStockApi(id);
      if (res?.success) {
        store.fetchStocks();
      }
      store.setLoadingState(false);
      store.setModalState(false);
    };

    return {
      tableData,
      headers,
      handleAddStocks,
      handleEditStocks,
      handleDeleteStocks,
    };
  },
});
</script>
