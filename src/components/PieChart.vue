<template>
  <div class="w-full max-w-[300px]">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { computed } from "vue";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  range: {
    type: String,
    default: "week",
  },
});

const weekData = {
  label: ["Espresso", "Latte", "Cappuccino"],
  data: [35, 45, 20],
};

const yearData = {
  label: ["Espresso", "Latte", "Cappuccino", "Spanish Latte"],
  data: [66, 99, 150, 240],
};

const chartData = computed(() => {
  if (props.range === "week") {
    return {
      labels: weekData.label,
      datasets: [
        {
          label: "Sales Distribution",
          data: weekData.data,
          backgroundColor: ["#facc15", "#60a5fa", "#f87171"],
        },
      ],
    };
  } else {
    return {
      labels: yearData.label,
      datasets: [
        {
          label: "Sales Distribution",
          data: yearData.data,
          backgroundColor: ["#facc15", "#60a5fa", "#f87171", "teal"],
        },
      ],
    };
  }
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};
</script>
