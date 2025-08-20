<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import { useRouter } from "vue-router";
import { proccessLogout } from "../utlis";
import { useTableStore } from "../stores/tableStore";
import { TriangleAlert } from "lucide-vue-next";
import { useUserStore } from "../stores/userStore";
export default defineComponent({
  name: "PrivateLayout",
  components: {
    Sidebar,
    Navbar,
    ConfirmDialog,
    TriangleAlert,
  },
  setup() {
    const userStore = useUserStore();
    const disableFunction = computed(() => userStore.disableFunction());

    const router = useRouter();
    const showDialog = ref(false);
    const handleLogout = () => {
      proccessLogout();
      showDialog.value = false;
      router.push("/login");
    };
    const store = useTableStore();
    const loading = computed(() => store.isFetchLoading);

    return {
      showDialog,
      handleLogout,
      loading,
      disableFunction,
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
    </div>
    <ConfirmDialog
      :show="showDialog"
      title="Logout"
      message="Are you sure you want to logout?."
      @cancel="showDialog = false"
      @confirm="handleLogout"
    />

    <div v-if="loading" class="w-full flex justify-center items-center">
      <div>
        <div class="loader"></div>
      </div>
    </div>
    <div v-else class="w-full">
      <div v-if="disableFunction" class="pt-4 px-4 flex gap-2 items-center">
        <TriangleAlert color="#FFA500" />
        <span class="text-xs"
          >Some functionalities are disabled on Guest account.</span
        >
      </div>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
nav {
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
