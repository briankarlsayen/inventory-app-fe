<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Sidebar",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const currRoute = ref(route.path);

    const handleChangePage = (url: string) => {
      currRoute.value = route.path;
      console.log("currRoute", currRoute.value);
      router.push(url);
    };
    return {
      handleChangePage,
      route,
    };
  },
});
</script>

<template>
  <div class="w-72 bg-blue-600 text-white justify-between flex flex-col">
    <div>
      <h4 class="text-center pt-4 pb-4">LOGO</h4>
      <div class="flex flex-col items-center pt-8 h-full">
        <div class="w-fit flex gap-2 flex-col">
          <p
            class="nav-item"
            :class="{ 'bg-blue-400': route.path === '/' }"
            @click="handleChangePage('/')"
          >
            Dashboard
          </p>
          <p
            class="nav-item"
            :class="{ 'bg-blue-400': route.path === '/stocks' }"
            @click="handleChangePage('/stocks')"
          >
            Stocks
          </p>
          <p
            class="nav-item"
            :class="{ 'bg-blue-400': route.path === '/stock-items' }"
            @click="handleChangePage('/stock-items')"
          >
            Stock Items
          </p>
          <p
            class="nav-item"
            :class="{ 'bg-blue-400': route.path === '/sales' }"
            @click="handleChangePage('/sales')"
          >
            Sales
          </p>
          <p
            class="nav-item"
            :class="{ 'bg-blue-400': route.path === '/sale-items' }"
            @click="handleChangePage('/sale-items')"
          >
            Sale Items
          </p>
        </div>
      </div>
    </div>
    <span class="text-center p-8 text-base">Logout</span>
  </div>
</template>
