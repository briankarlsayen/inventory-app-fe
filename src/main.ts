import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./pages/Login.vue";
import HomePage from "./pages/Home.vue";
import PrivateLayout from "./layout/PrivateLayout.vue";
import Stocks from "./pages/Stocks.vue";
import StockItems from "./pages/StockItems.vue";
import { createPinia } from "pinia";
import DefaultLayout from "./layout/DefaultLayout.vue";
import { useTableStore } from "./stores/tableStore";
import Products from "./pages/Products.vue";
import Orders from "./pages/Orders.vue";
import Notfound from "./pages/NotFound.vue";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "./stores/userStore";
import { removeLoginTokens } from "./utlis";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    redirect: () => {
      const authKey = localStorage.getItem("access");
      try {
        jwtDecode(authKey);
      } catch (error) {
        removeLoginTokens();
      }

      return { path: authKey ? "/app" : "/login" };
    },
    children: [
      {
        path: "/login",
        component: LoginPage,
        name: "Login",
        beforeEnter: (_to, _from, next) => {
          const token = localStorage.getItem("access");
          if (!token) next();
          try {
            jwtDecode(token);
            return next({ path: "/app" });
          } catch (error) {
            // remove login tokens
            removeLoginTokens();
          }
        },
      },
    ],
  },
  {
    path: "/app",
    component: PrivateLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/app/",
        component: HomePage,
        beforeEnter: async () => {
          const store = useTableStore();
          store.setFetchLoading(true);
          await store.initializeDashboardDetails();
          store.setFetchLoading(false);
        },
      },
      { path: "/app/stocks", component: Stocks },
      { path: "/app/stock-items", component: StockItems },
      { path: "/app/products", component: Products },
      { path: "/app/orders", component: Orders },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: Notfound,
    children: [],
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
  const accessToken = localStorage.getItem("access");
  if (!accessToken) return false;
  else {
    try {
      const user: any = jwtDecode(accessToken);
      console.log("user", user);
      const userStore = useUserStore();
      if (user?.role) userStore.setRole(user?.role);
    } catch (error) {
      removeLoginTokens();
      return false;
    }
    return true;
  }
  // return !!localStorage.getItem("access"); // or use a Pinia store
}

const fetchInitialData = async () => {
  const store = useTableStore();

  await store.initializeStockItems();
  await store.initializeProducts();
  await store.initializeOrders();
  await store.fetchStocks();
  await store.initializeDashboardDetails();
};

let initialized = false;

function hideLoader() {
  const loader = document.getElementById("loading-screen");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 500);
  }
}

router.beforeEach(async (to, _from, next) => {
  const auth = isAuthenticated();

  if (to.meta.requiresAuth && !auth) {
    hideLoader();

    next({ name: "Login" });
  }

  if (to.meta.requiresAuth && !initialized) {
    try {
      await fetchInitialData();
      initialized = true;
      hideLoader();
    } catch (err) {
      console.error("❌ Initialization failed:", err);
      return next({ name: "Login" });
    }
  }

  hideLoader();

  next();
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
