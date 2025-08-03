import { defineStore } from "pinia";
import type { TableHeader } from "../components/BaseTable.vue";
import { getItemCategoriesApi, getStockItemsApi } from "../api/api";

export interface IInputField {
  key: string;
  label: string;
  inputType: "text" | "autocomplete" | "date" | "number";
  disabled?: boolean;
}

type FormType = "add" | "edit";

const handleValidation = ({ formData, form }) => {
  const errors = {};

  formData.forEach(({ key, rules }) => {
    const value = form[key];
    if (rules) {
      for (const rule of rules) {
        if (rule.required && !value) {
          errors[key] = rule.message;
          break;
        }
        if (rule.validator && !rule.validator(value)) {
          errors[key] = rule.message;
          break;
        }
      }
    }
  });

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
};

export const useTableStore = defineStore("table", {
  state: () => ({
    formData: {} as any,
    formValidation: {},
    inputFields: [] as TableHeader[],
    formType: "add" as FormType,
    initialFormData: {},
    tableHeader: [] as any[],
    errors: {},
    categories: [] as any[],
    stockItems: [] as any[],
  }),
  actions: {
    async initializeCategories() {
      console.log("running...");
      const res = await getItemCategoriesApi();
      console.log("res", res);
      if (!res.success) return;
      this.categories = res.data;
    },
    async initializeStockItems() {
      const res = await getStockItemsApi();
      if (!res.success) return;
      this.stockItems = res.data;
    },
    setTableHeader(props: any) {
      this.tableHeader = props;
    },
    setFormValidation(props: any) {
      this.formValidation = props;
    },
    setInputFields(props: any) {
      this.inputFields = props;
    },
    setInitialFormData(props: any) {
      this.initialFormData = props;
    },
    addFields() {
      this.formData = this.initialFormData;
    },
    editFields(props: any) {
      this.formData = props;
    },
    clearFiels() {
      // this.formData
    },
    validateForm(props: any) {
      const res = handleValidation({ formData: this.inputFields, form: props });
      console.log("err", res.errors);
      this.errors = res.errors;
      return res.success;
    },
  },
});
