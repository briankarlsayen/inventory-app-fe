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

const routes = [
  {
    path: "/",
    component: PrivateLayout,
    children: [
      { path: "/", component: HomePage },
      { path: "/stocks", component: Stocks },
      { path: "/stock-items", component: StockItems },
      { path: "/sales", component: Sales },
      { path: "/sale-items", component: SaleItems },
    ],
  },
  { path: "/login", component: LoginPage, name: "Login" },
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
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
