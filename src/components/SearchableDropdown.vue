<template>
  <div class="relative w-full" ref="dropdown">
    <!-- Search box -->
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
        :key="optionKey(option, index)"
        @click="selectOption(option)"
        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ optionLabel(option) }}
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

// Props
const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: { type: Array, default: () => [] }, // supports string[] or {id, name}[]
  idKey: { type: String, default: "id" },
  nameKey: { type: String, default: "name" },
});

const emit = defineEmits(["update:modelValue"]);

// State
const search = ref("");
const isOpen = ref(false);
const dropdown = ref(null);

// Normalize options so both strings and objects work
const normalizedOptions = computed(() =>
  props.options.map((o, i) => {
    if (typeof o === "string" || typeof o === "number") {
      return { id: String(o), name: String(o) };
    }
    return {
      id: String(o[props.idKey] ?? i),
      name: String(o[props.nameKey] ?? ""),
    };
  })
);

// Filter options based on search
const filteredOptions = computed(() => {
  const term = search.value.toLowerCase();
  return normalizedOptions.value.filter((opt) =>
    opt.name.toLowerCase().includes(term)
  );
});

// Helpers
function optionKey(option, index) {
  return option.id ?? index;
}
function optionLabel(option) {
  return option.name;
}

// Select an option
function selectOption(option) {
  emit("update:modelValue", option.id);
  search.value = option.name;
  isOpen.value = false;
}

// Close dropdown when clicking outside
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

// Sync search text with selected value on mount
onMounted(() => {
  const selected = normalizedOptions.value.find(
    (opt) => opt.id === String(props.modelValue)
  );
  if (selected) search.value = selected.name;
});
</script>
