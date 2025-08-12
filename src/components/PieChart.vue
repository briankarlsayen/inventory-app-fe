<template>
  <div class="w-full max-w-[300px]">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="tsx">
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { computed } from "vue";

ChartJS.register(ArcElement, Tooltip, Legend);

// const props = defineProps({
//   range: {
//     type: String,
//     default: "week",
//   },
// });

const props = defineProps<{
  range: string;
  label: string[];
  data: number[];
}>();

const data = computed(() => props.data);
const label = computed(() => props.label);

const backgroundColor = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
  "#8DD17E",
  "#E77E23",
  "#FF6F61",
];

const chartData = computed(() => {
  if (props.range === "week") {
    return {
      labels: label.value,
      datasets: [
        {
          label: "Sales Distribution",
          data: data.value,
          backgroundColor,
        },
      ],
    };
  } else {
    return {
      labels: label?.value,
      datasets: [
        {
          label: "Sales Distribution",
          data: data.value,
          backgroundColor,
        },
      ],
    };
  }
});

const chartOptions = {
  responsive: true,
  plugins: {
    // legend: {
    //   position: "bottom",
    // },
  },
};
</script>
