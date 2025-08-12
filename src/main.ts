import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./pages/Login.vue";
import HomePage from "./pages/Home.vue";
import PrivateLayout from "./layout/PrivateLayout.vue";
import Stocks from "./pages/Stocks.vue";
import StockItems from "./pages/StockItems.vue";
import Sales from "./pages/Sales.vue";
import SaleItems from "./pages/SaleItems.vue";
import { createPinia } from "pinia";
import DefaultLayout from "./layout/DefaultLayout.vue";
import { useTableStore } from "./stores/tableStore";
import Products from "./pages/Products.vue";
import Orders from "./pages/Orders.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    redirect: () => {
      const authKey = localStorage.getItem("access");
      return { path: authKey ? "/app" : "/login" };
    },
    children: [{ path: "/login", component: LoginPage, name: "Login" }],
  },
  {
    path: "/app",
    component: PrivateLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "/app/", component: HomePage },
      { path: "/app/stocks", component: Stocks },
      { path: "/app/stock-items", component: StockItems },
      { path: "/app/sales", component: Sales },
      { path: "/app/sale-items", component: SaleItems },
      { path: "/app/products", component: Products },
      { path: "/app/orders", component: Orders },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return savedPosition || { top: 0 };
  },
});

function isAuthenticated() {
  return !!localStorage.getItem("access"); // or use a Pinia store
}

const fetchInitialData = async () => {
  const store = useTableStore();

  await store.initializeCategories();
  await store.initializeStockItems();
  await store.initializeProducts();
  await store.initializeOrders();
  await store.fetchStocks();
  await store.initializeDashboardDetails();
};

let initialized = false;

router.beforeEach(async (to, _from, next) => {
  const auth = isAuthenticated();

  if (to.meta.requiresAuth && !auth) {
    next({ name: "Login" });
  }

  if (to.meta.requiresAuth && !initialized) {
    try {
      await fetchInitialData();
      initialized = true;
    } catch (err) {
      console.error("❌ Initialization failed:", err);
      return next({ name: "Login" });
    }
  }

  next();

  // else if (to.name === "Login" && auth) {
  //   next({ path: "/app/" });
  // } else {
  //   next();
  // }
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
