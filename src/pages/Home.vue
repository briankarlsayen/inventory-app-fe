<template>
  <div class="p-4">
    <h4 class="pb-8 pt-8">Dashboard</h4>
    <p>Overview</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="dashboard-card">
        <span class="text-xs text-gray-600 uppercase">Total Sales</span>
        <p>
          {{ totalSales }}
        </p>
      </div>
      <div class="dashboard-card">
        <span class="text-xs text-gray-600 uppercase">Top Product</span>
        <p>{{ topProduct }}</p>
      </div>
      <div class="dashboard-card">
        <span class="text-xs text-gray-600 uppercase">Low Stock Count:</span>
        <p>{{ lowStockCount }}</p>
      </div>
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
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="flex w-full flex-col">
        <BarChart :range="selectedRange" />
      </div>
      <div class="flex w-full flex-col justify-between">
        <PieChart :range="selectedRange" />
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import BarChart from "../components/BarChart.vue";
import PieChart from "../components/PieChart.vue";
const totalSales = 30;
const topProduct = "Spanish Latte";
const lowStockCount = 2;
const selectedRange = ref("week");
</script>
