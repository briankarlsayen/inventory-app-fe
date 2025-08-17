<template>
  <div class="p-4">
    <h4 class="pb-8 pt-8">Dashboard</h4>
    <p>Overview</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="dashboard-card">
        <span class="text-xs text-gray-600 uppercase">Total Sales</span>
        <p v-if="data?.totalSales">
          <b>
            {{ formatPrice(data?.totalSales) }}
          </b>
        </p>
        <p v-else>-</p>
      </div>
      <div class="dashboard-card">
        <span class="text-xs text-gray-600 uppercase">Weekly Top Product</span>
        <p v-if="data.weeklyTopProduct">
          <b>
            {{ data.weeklyTopProduct }}
          </b>
        </p>
        <p v-else>-</p>
      </div>
      <!-- <div class="dashboard-card">
        <span class="text-xs text-gray-600 uppercase">Low Stock Count:</span>
        <p>{{ lowStockCount }}</p>
      </div> -->
    </div>
    <div class="pt-8 flex flex-row items-center gap-4">
      <p>Sales</p>
      <select
        v-model="selectedRange"
        class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200 h-fit"
      >
        <option value="week">This Week</option>
        <option value="year">This Year</option>
      </select>
    </div>
    <div v-if="data?.totalSales" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="flex w-full flex-col">
        <BarChart :data="data.sales[selectedRange]" :range="selectedRange" />
      </div>
      <div class="flex w-full flex-col justify-between items-center">
        <PieChart
          :label="data.products[selectedRange]?.label"
          :data="data.products[selectedRange]?.count"
          :range="selectedRange"
        />
      </div>
    </div>
    <div v-else class="text-center pt-16">
      <p>No data found</p>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { computed, ref } from "vue";
import BarChart from "../components/BarChart.vue";
import PieChart from "../components/PieChart.vue";
import { useTableStore } from "../stores/tableStore";
import { formatPrice } from "../utlis";

const store = useTableStore();

const data = computed(() => store.dashboardDetails);
const selectedRange = ref("week");
</script>
