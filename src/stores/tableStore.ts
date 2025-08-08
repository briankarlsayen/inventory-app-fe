import { defineStore } from "pinia";
import {
  getItemCategoriesApi,
  getOrdersApi,
  getProductsApi,
  getStockItemsApi,
  getStocksApi,
} from "../api/api";
import { utcToLocaleDate } from "../utlis";

interface OptionObj {
  id: string;
  name: string;
}

export interface TableFormFields {
  key: string;
  label: string;
  inputType?:
    | "text"
    | "autocomplete"
    | "date"
    | "number"
    | "select" // options = {id: string, name: string}[]
    | "select-str"; // options = string[];
  disabled?: boolean;
  default?: string | number;
  rules?: any[];
  options?: OptionObj[] | string[];
}

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
    inputFields: [] as TableFormFields[],
    formType: "add" as FormType,
    initialFormData: {},
    tableHeader: [] as any[],
    errors: {},
    categories: [] as any[],
    stockItems: [] as any[],
    stocks: [] as any[],
    products: [] as any[],
    orders: [] as any[],
  }),
  actions: {
    async fetchStocks() {
      const res = await getStocksApi();
      const formattedData = res?.data.map((item) => {
        return {
          id: item?.id,
          item: {
            name: item?.item_details.name,
            id: item?.item_details.id,
          },
          quantity: item?.quantity,
          date: utcToLocaleDate(item?.date),
          type: item?.type,
        };
      });
      this.stocks = formattedData;
    },
    async initializeStockItems() {
      const res = await getStockItemsApi();
      const formatData = res?.data.map((item) => {
        return {
          id: item?.id,
          name: item?.name,
          reorderLevel: item?.reorder_level,
          category: item?.category_details,
          unit: item?.unit,
        };
      });
      this.stockItems = formatData;
    },
    async initializeCategories() {
      const res = await getItemCategoriesApi();
      if (!res.success) return;
      this.categories = res.data;
    },
    async initializeProducts() {
      const res = await getProductsApi();
      if (!res.success) return;
      this.products = res.data;
    },
    async initializeOrders() {
      const res = await getOrdersApi();
      if (!res.success) return;
      const formatData = res?.data.map((order) => {
        return {
          id: order?.id,
          name: order?.name,
          paymentType: order?.payment_type,
          totalAmount: order?.total_amount,
          date: utcToLocaleDate(order?.date),
          products: order?.products,
          discountDetails: order?.dicount_details,
          adjumentDetails: order?.adjustment_details,
        };
      });
      this.orders = formatData;
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
