<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import { useRouter } from "vue-router";
import { proccessLogout } from "../utlis";
import { useTableStore } from "../stores/tableStore";
export default defineComponent({
  name: "PrivateLayout",
  components: {
    Sidebar,
    Navbar,
    ConfirmDialog,
  },
  setup() {
    const router = useRouter();
    const showDialog = ref(false);
    const handleLogout = () => {
      proccessLogout();
      showDialog.value = false;
      router.push("/login");
    };

    // const store = useTableStore();

    // onBeforeMount(async () => {
    //   console.log("before mount");
    //   await store.initializeCategories();
    //   console.log("after before");
    // });

    return {
      showDialog,
      handleLogout,
    };
  },
});
</script>

<template>
  <div class="flex w-full min-h-[100vh] h-full md:flex-row flex-col">
    <div class="hidden md:flex">
      <Sidebar @click-logout="showDialog = true" />
    </div>
    <div class="md:hidden block">
      <Navbar @click-logout="showDialog = true" />
      <!-- <p>Navbar</p> -->
    </div>
    <ConfirmDialog
      :show="showDialog"
      title="Logout"
      message="Are you sure you want to logout?."
      @cancel="showDialog = false"
      @confirm="handleLogout"
    />
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
