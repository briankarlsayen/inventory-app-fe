<template>
  <div>
    <div class="flex gap-4 justify-between pb-4">
      <input
        class="w-full max-w-80 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 border text-black"
      />
      <div class="flex gap-2">
        <button class="btn btn-outline" @click="handleFilterClick">
          Filter
        </button>
        <button class="btn btn-primary" @click="handleAddClick">Add</button>
      </div>
    </div>
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200 bg-white">
        <thead class="bg-gray-100">
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="px-4 py-2 text-left text-sm font-semibold text-gray-700"
            >
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(row, rowIndex) in paginatedRows"
            :key="rowIndex"
            class="hover:bg-gray-50 cursor-pointer"
            @click="$emit('row-click', row)"
          >
            <td
              v-for="(header, colIndex) in headers"
              :key="colIndex"
              class="px-4 py-2 text-sm text-gray-700"
            >
              {{ row[header.key] }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination controls -->
      <div class="flex justify-between items-center p-4 bg-gray-50">
        <button
          class="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <span class="text-sm text-gray-600">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          class="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  headers: {
    type: Array, // [{ key: 'name', label: 'Name' }]
    required: true,
  },
  rows: {
    type: Array, // [{ name: '', quantity: '', date: '' }]
    required: true,
  },
  perPage: {
    type: Number,
    default: 5,
  },
});

defineEmits(["row-click", "add-click"]);

const currentPage = ref(1);

const totalPages = computed(() => {
  return Math.ceil(props.rows.length / props.perPage);
});

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * props.perPage;
  return props.rows.slice(start, start + props.perPage);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

const handleAddClick = () => {
  console.log("open form");
};

const handleFilterClick = () => {
  console.log("open filter form");
};
</script>
