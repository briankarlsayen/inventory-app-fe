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
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Actions
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
            <td class="px-4 py-2 text-sm text-gray-700 flex gap-1">
              <SquarePen
                class="hover:bg-gray-100 p-2 rounded-md"
                color="#e5a50a"
                :size="36"
                @click="() => handleOpenEditForm(row)"
              />

              <Trash
                class="hover:bg-gray-100 p-2 rounded-md"
                color="#a51d2d"
                :size="36"
                @click="showDialog = true"
              />
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
    <TableFormModal
      :title="modalTitle"
      :show="isOpen"
      @close="isOpen = false"
      @submit="handleSubmit"
      :formData="formData"
    />

    <ConfirmDialog
      :show="showDialog"
      title="Delete Item"
      message="Are you sure you want to delete this item? This cannot be undone."
      @cancel="showDialog = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import TableFormModal from "./TableFormModal.vue";
import { SquarePen, Trash } from "lucide-vue-next";
import ConfirmDialog from "./ConfirmDialog.vue";

interface TableHeader {
  key: string;
  label: string;
}
interface TableRow {
  name: string;
  quantity: string;
  data: string;
}

const props = defineProps<{
  headers: TableHeader[];
  rows: TableRow[];
  perPage: number;
}>();

const modalTitle = ref("Add");

const emit = defineEmits([
  "row-click",
  "add-click",
  "add-request",
  "edit-request",
  "delete-request",
]);

const currentPage = ref(1);
const isOpen = ref(false);

const today = new Date().toISOString().slice(0, 10);

const formData = ref({
  id: null,
  name: "",
  quantity: "",
  date: today,
});

const totalPages = computed(() => {
  return Math.ceil(props.rows.length / props.perPage);
});

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * props.perPage;
  return props.rows.slice(start, start + props.perPage);
});

const showDialog = ref(false);

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
  isOpen.value = true;
  modalTitle.value = "Add";
  formData.value = {
    id: null,
    name: "",
    quantity: "",
    date: today,
  };
  console.log("open form");
};

const handleFilterClick = () => {
  console.log("open filter form");
};

const handleOpenEditForm = (item: any) => {
  isOpen.value = true;
  modalTitle.value = "Edit";

  formData.value = {
    ...item,
  };
  console.log("open edit form");
};

const handleSubmit = () => {
  if (modalTitle.value === "Add") {
    emit("add-request", "data");
  } else {
    emit("edit-request", "data");
  }
};

function handleDelete() {
  emit("delete-request", "data");
  showDialog.value = false;
}
</script>
