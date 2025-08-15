<template>
  <div class="bg-blue-600 text-white">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-1">
        <button
          @click="isOpen = !isOpen"
          class="text-white hover:text-black p-2 cursor-pointer h-12"
        >
          <Menu v-if="!isOpen" />
          <X v-else />
        </button>
        <p>SILONG CAFE</p>
      </div>
      <div class="pr-2">
        <button
          class="text-white hover:text-black p-2 cursor-pointer h-12"
          @click="$emit('click-logout')"
        >
          <LogOut :size="18" />
        </button>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="md:hidden px-4 pb-4 text-center gap-2 flex flex-col"
    >
      <p
        class="nav-item"
        :class="{ 'bg-blue-400': route.path === '/' }"
        @click="handleChangePage('/app')"
      >
        Dashboard
      </p>
      <p
        class="nav-item"
        :class="{ 'bg-blue-400': route.path === '/stocks' }"
        @click="handleChangePage('/app/stocks')"
      >
        Stocks
      </p>
      <p
        class="nav-item"
        :class="{ 'bg-blue-400': route.path === '/stock-items' }"
        @click="handleChangePage('/app/stock-items')"
      >
        Stock Items
      </p>
      <p
        class="nav-item"
        :class="{ 'bg-blue-400': route.path === '/products' }"
        @click="handleChangePage('/app/products')"
      >
        Products
      </p>
      <p
        class="nav-item"
        :class="{ 'bg-blue-400': route.path === '/orders' }"
        @click="handleChangePage('/app/orders')"
      >
        Orders
      </p>
    </div>
  </div>
</template>
<script setup lang="tsx">
import { LogOut, Menu, X } from "lucide-vue-next";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
defineEmits(["click-logout"]);
const isOpen = ref(false);

const router = useRouter();
const route = useRoute();
const currRoute = ref(route.path);

const handleChangePage = (url: string) => {
  currRoute.value = route.path;
  router.push(url);
  isOpen.value = false;
};
</script>
