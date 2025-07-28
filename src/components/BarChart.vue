<template>
  <div class="w-full max-w-[800px]">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { computed } from "vue";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  range: {
    type: String,
    default: "week", // week | month | year
  },
});

// Example mock data switch based on range
const chartData = computed(() => {
  if (props.range === "week") {
    return {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales",
          data: [120, 150, 170, 90, 200],
          backgroundColor: "#60a5fa",
        },
      ],
    };
  } else {
    return {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Sales",
          data: [3000, 2800, 4000, 3500, 4200],
          backgroundColor: "#60a5fa",
        },
      ],
    };
  }
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
  },
  scales: {
    y: { beginAtZero: true },
  },
};
</script>
