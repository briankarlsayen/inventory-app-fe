<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Sidebar",
  setup() {
    const router = useRouter();
    const handleChangePage = (url: string) => {
      router.push(url);
    };
    return {
      handleChangePage,
    };
  },
});
</script>

<template>
  <div class="w-72 bg-blue-600">
    <div>
      <h4 class="text-center pt-4 pb-4">LOGO</h4>
      <div class="flex flex-col items-center pt-8">
        <div class="w-fit flex gap-2 flex-col">
          <p class="nav-item" @click="handleChangePage('/')">Dashboard</p>
          <p class="nav-item" @click="handleChangePage('/stocks')">Stocks</p>
          <p class="nav-item" @click="handleChangePage('/stock-items')">
            Stock Items
          </p>
          <p class="nav-item" @click="handleChangePage('/sales')">Sales</p>
          <p class="nav-item" @click="handleChangePage('/sale-items')">
            Sale Items
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
