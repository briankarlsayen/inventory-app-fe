<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "../components/Sidebar.vue";

export default defineComponent({
  name: "PrivateLayout",
  components: {
    Sidebar,
  },
  setup() {},
});
</script>

<template>
  <div class="flex w-full min-h-[100vh] h-full">
    <div class="hidden md:flex">
      <Sidebar />
    </div>
    <div class="md:hidden block">
      <p>Navbar</p>
    </div>

    <div class="w-full">
      <router-view />
    </div>
  </div>
  <div class="flex w-full min-h-[100vh] h-full">
    <Sidebar />

    <div class="w-full">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
nav {
  /* padding: 1rem; */
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #2a5ba6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  height: 5vh;
  justify-content: space-between;
}
.nav-logo {
  color: white;
  padding-right: 1rem;
}
.container {
  display: flex;
  width: "100vw";
  height: "100vh";
}
.icon {
  color: white;
}

.icon:hover {
  color: #cfcfcf;
  transition: color 0.3s;
  cursor: pointer;
}
</style>
