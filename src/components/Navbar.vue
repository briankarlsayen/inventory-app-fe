<template>
  <div class="bg-blue-600 text-white">
    <div class="flex items-center gap-1">
      <button
        @click="isOpen = !isOpen"
        class="text-white hover:text-black p-2 cursor-pointer h-12"
      >
        <svg
          v-if="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <p>LOGO</p>
    </div>
    <div
      v-if="isOpen"
      class="md:hidden px-4 pb-4 text-center gap-2 flex flex-col"
    >
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
</template>
<script setup lang="tsx">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const isOpen = ref(false);

const router = useRouter();
const route = useRoute();
const currRoute = ref(route.path);

const handleChangePage = (url: string) => {
  currRoute.value = route.path;
  console.log("currRoute", currRoute.value);
  router.push(url);
};
</script>
