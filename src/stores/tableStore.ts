import { defineStore } from "pinia";
import {
  getDashboardApi,
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

interface IProduct {
  id: string;
  name: string;
  price: number;
  size: string;
  type: string;
}

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

interface IDashboardDetails {
  weeklyTopProduct: string;
  totalSales: number;
  sales: {
    week: number[];
    year: number[];
  };
  products: {
    week: {
      label: string[];
      count: number[];
    };
    year: {
      label: string[];
      count: number[];
    };
  };
}

export const useTableStore = defineStore("table", {
  state: () => ({
    formData: {} as any,
    formValidation: {},
    inputFields: [] as TableFormFields[],
    formType: "add" as FormType,
    initialFormData: {} as any,
    tableHeader: [] as any[],
    errors: {},
    categories: [] as any[],
    stockItems: [] as any[],
    stocks: [] as any[],
    products: [] as IProduct[],
    orders: [] as any[],
    selectProductIds: [] as any,
    dashboardDetails: {
      weeklyTopProduct: "",
      totalSales: 0,
      sales: {
        week: [],
        year: [],
      },
      products: {
        week: {
          label: [],
          count: [],
        },
        year: {
          label: [],
          count: [],
        },
      },
    } as IDashboardDetails,
    isTableModalLoading: false,
    isTableModalOpen: false,
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
      console.log("res", res.data);
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
          products: order?.products.map((product) => {
            return {
              id: product?.product_details?.id,
              name: product?.product_details?.name,
              quantity: product.quantity,
              purchasePrice: product?.purchase_price,
              price: product?.product_details?.price,
              size: product?.product_details?.size,
            };
          }),
          discountDetails: order?.dicount_details,
          adjumentDetails: order?.adjustment_details,
        };
      });
      this.orders = formatData;
    },
    async initializeDashboardDetails() {
      const res = await getDashboardApi();
      if (res?.success) {
        const data = res?.data;
        const weeklyData = data?.order.week?.map((e) => e.count);
        const yearlyData = data?.order.year?.map((e) => e.count);

        const productWeeklyData = {
          label: [],
          count: [],
        };
        data?.top_products?.week.map((e) => {
          productWeeklyData.label.push(e.name);
          productWeeklyData.count.push(e.quantity);
        });

        const productYearlyData = {
          label: [],
          count: [],
        };

        data?.top_products?.year.map((e) => {
          productYearlyData.label.push(e.name);
          productYearlyData.count.push(e.quantity);
        });

        const formatData: IDashboardDetails = {
          weeklyTopProduct: data?.top_products?.week[0]?.name,
          totalSales: data?.total_sales,
          products: {
            week: productWeeklyData,
            year: productYearlyData,
          },
          sales: {
            week: weeklyData,
            year: yearlyData,
          },
        };
        this.dashboardDetails = formatData;
      }
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
      if (this.initialFormData.products) {
        this.selectProductIds = this.initialFormData.products?.map((e) => e.id);
      }
      this.formData = this.initialFormData;
    },
    editFields(props: any) {
      if (props.products) {
        this.selectProductIds = props.products?.map((e) => e.id);
      }
      this.formData = props;
    },
    clearFiels() {
      // this.formData
    },
    validateForm(props: any) {
      const res = handleValidation({ formData: this.inputFields, form: props });
      this.errors = res.errors;
      return res.success;
    },
    setLoadingState(props: boolean) {
      this.isTableModalLoading = props;
    },
    setModalState(props: boolean) {
      this.isTableModalOpen = props;
    },
  },
});
