<template>
  <div class="relative w-full" ref="dropdown">
    <input
      type="text"
      v-model="search"
      @focus="isOpen = true"
      placeholder="Search..."
      class="w-full border rounded px-3 py-2"
    />

    <!-- Dropdown list -->
    <ul
      v-if="isOpen && filteredOptions.length"
      class="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-auto shadow"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="itemKey(option, index)"
        @click="selectOption(option)"
        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ itemLabel(option) }}
      </li>
    </ul>

    <!-- No results -->
    <div
      v-if="isOpen && !filteredOptions.length"
      class="absolute z-10 w-full bg-white border rounded mt-1 p-2 text-gray-500"
    >
      No results found
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: { type: Array, default: () => [] }, // selected array
  options: { type: Array, default: () => [] }, // string[] or {id, name}[]
  idKey: { type: String, default: "id" },
  nameKey: { type: String, default: "name" },
});

const emit = defineEmits(["update:modelValue", "select"]);

// State
const search = ref("");
const isOpen = ref(false);
const dropdown = ref(null);

// Normalize options
const normalizedOptions = computed(() => props.options);

// Filter options (exclude already selected)
const filteredOptions = computed(() => {
  const term = search.value.toLowerCase();
  return normalizedOptions.value.filter(
    (o) =>
      !props.modelValue.includes(o.id) &&
      (o.name.toLowerCase().includes(term) || o.id.toLowerCase().includes(term))
  );
});

// Helpers
function itemKey(item, index) {
  return item.id ?? index;
}
function itemLabel(item) {
  return item.name;
}

// Actions
function selectOption(option) {
  emit("update:modelValue", [...props.modelValue, option.id]);
  search.value = ""; // clear search
  isOpen.value = true; // keep dropdown open for multiple selections\
  emit("select", option);
}

function removeItem(item) {
  emit(
    "update:modelValue",
    props.modelValue.filter((id) => id !== item.id)
  );
}

// Close on outside click
function handleClickOutside(e) {
  if (dropdown.value && !dropdown.value.contains(e.target)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
