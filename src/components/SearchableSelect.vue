<template>
  <div class="relative inline-block w-full" ref="root">
    <!-- visible input (shows selected label or search) -->
    <div class="flex items-center gap-2">
      <input
        ref="input"
        type="text"
        :placeholder="placeholder"
        v-model="query"
        @focus="openList"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.prevent="onEnter"
        @keydown.esc.prevent="closeList"
        class="w-full border rounded px-3 py-2"
        :aria-expanded="isOpen"
        :aria-controls="listId"
        :aria-autocomplete="'list'"
      />

      <!-- clear button -->
      <button
        v-if="allowClear && selectedLabel"
        type="button"
        @click="clear"
        class="px-2 py-1"
        title="Clear"
      >
        ✕
      </button>
    </div>

    <!-- dropdown list -->
    <ul
      v-show="isOpen && filtered.length"
      :id="listId"
      role="listbox"
      class="absolute z-40 mt-1 max-h-56 w-full overflow-auto rounded border bg-white shadow"
    >
      <li
        v-for="(opt, idx) in filtered"
        :key="keyFor(opt, idx)"
        :class="[
          'px-3 py-2 cursor-pointer',
          highlightedIndex === idx ? 'bg-gray-100' : '',
        ]"
        role="option"
        :aria-selected="highlightedIndex === idx"
        @mousedown.prevent="selectOption(opt)"
        @mousemove="highlightedIndex = idx"
      >
        {{ labelFor(opt) }}
      </li>
    </ul>

    <!-- optionally show "no results" -->
    <div v-show="isOpen && !filtered.length" class="mt-1 text-sm text-gray-500">
      No results
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

/**
 * Props:
 * - modelValue: bound value (v-model)
 * - options: array of string OR {id, name}
 * - placeholder: input placeholder
 * - allowClear: show clear button
 */
const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: { type: String, default: "Select or search..." },
  allowClear: { type: Boolean, default: true },
  // optional prop to customize which field is the id/name for object options
  idKey: { type: String, default: "id" },
  nameKey: { type: String, default: "name" },
});

const emit = defineEmits(["update:modelValue", "change", "select"]);

// reactive
const root = ref(null);
const input = ref(null);
const query = ref("");
const isOpen = ref(false);
const highlightedIndex = ref(-1);
const listId = `searchable-list-${Math.random().toString(36).slice(2, 9)}`;

// normalize options into objects { id: string, name: string }
const normalized = computed(() =>
  props.options.map((o, i) => {
    if (o == null) return { id: String(o), name: "" };
    if (typeof o === "string" || typeof o === "number") {
      return { id: String(o), name: String(o) };
    }
    // assume object: pick keys
    return {
      id: String(o[props.idKey] ?? o.id ?? String(i)),
      name: String(o[props.nameKey] ?? o.name ?? ""),
    };
  })
);

// current selected object (if modelValue matches an id)
const selected = computed(
  () => normalized.value.find((o) => o.id === String(props.modelValue)) ?? null
);

const selectedLabel = computed(() =>
  selected.value ? selected.value.name : ""
);

// filtered list based on query (simple case-insensitive substring)
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return normalized.value;
  return normalized.value.filter(
    (o) =>
      (o.name && o.name.toLowerCase().includes(q)) ||
      (o.id && o.id.toLowerCase().includes(q))
  );
});

// watchers: when modelValue changes, update query to show selected label
watch(
  () => props.modelValue,
  () => {
    // update input text to reflect selection
    query.value = selectedLabel.value || "";
  },
  { immediate: true }
);

// helpers
function labelFor(opt) {
  return opt.name;
}
function keyFor(opt, idx) {
  return opt.id ?? idx;
}

// open/close/select
function openList() {
  isOpen.value = true;
  // set highlighted to first match
  highlightedIndex.value = filtered.value.length ? 0 : -1;
}
function closeList() {
  isOpen.value = false;
  highlightedIndex.value = -1;
  // show label if selected
  query.value = selectedLabel.value || "";
}

function selectOption(opt) {
  emit("update:modelValue", opt.id);
  emit("change", opt.id);
  emit("select", opt);
  isOpen.value = false;
  highlightedIndex.value = -1;
  query.value = opt.name;
  // focus back to input for UX
  input.value && input.value.focus();
}

// keyboard handlers
function onArrowDown() {
  if (!isOpen.value) {
    openList();
    return;
  }
  if (filtered.value.length === 0) return;
  highlightedIndex.value = Math.min(
    highlightedIndex.value + 1,
    filtered.value.length - 1
  );
  scrollHighlightedIntoView();
}
function onArrowUp() {
  if (!isOpen.value) {
    openList();
    return;
  }
  highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0);
  scrollHighlightedIntoView();
}
function onEnter() {
  if (
    isOpen.value &&
    highlightedIndex.value >= 0 &&
    highlightedIndex.value < filtered.value.length
  ) {
    selectOption(filtered.value[highlightedIndex.value]);
  } else {
    // if no highlight but there is exact match by name or id, pick it
    const q = query.value.trim().toLowerCase();
    const exact = normalized.value.find(
      (o) => o.name.toLowerCase() === q || o.id.toLowerCase() === q
    );
    if (exact) selectOption(exact);
  }
}

function scrollHighlightedIntoView() {
  // ensure the highlighted item is visible
  // simple approach: query the element under the ul by index
  const ul = root.value?.querySelector("ul");
  if (!ul) return;
  const item = ul.children[highlightedIndex.value];
  if (item) {
    const rect = item.getBoundingClientRect();
    const parentRect = ul.getBoundingClientRect();
    if (rect.top < parentRect.top) item.scrollIntoView({ block: "nearest" });
    else if (rect.bottom > parentRect.bottom)
      item.scrollIntoView({ block: "nearest" });
  }
}

function clear() {
  emit("update:modelValue", null);
  emit("change", null);
  query.value = "";
  // open list so user can pick
  openList();
}

// click outside handling
function onClickOutside(e) {
  if (!root.value) return;
  if (!root.value.contains(e.target)) {
    closeList();
  }
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<style scoped>
/* tiny visual improvements, remove or replace with Tailwind classes if you prefer */
ul {
  min-width: 100%;
  box-sizing: border-box;
}
</style>
