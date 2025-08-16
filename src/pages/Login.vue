<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm bg-white p-4 rounded shadow m-4">
      <h3 class="text-2xl font-bold mb-4 text-center text-gray-800">Login</h3>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block mb-1 text-gray-700"
            >Username</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            class="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 border text-black"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-1 text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-black"
            required
          />
        </div>
        <div class="pb-4">
          <span class="text-sm text-red-600" v-if="errorMsg">{{
            errorMsg
          }}</span>
        </div>
        <BaseButton
          class="btn btn-primary w-full"
          type="submit"
          :loading="isLoading"
        >
          Login
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "../api/api";
import BaseButton from "../components/BaseButton.vue";
const router = useRouter();

const username = ref("");
const password = ref("");
const errorMsg = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  errorMsg.value = "";
  isLoading.value = true;
  const login = await loginApi({
    username: username.value,
    password: password.value,
  });

  if (login?.success) {
    localStorage.setItem("access", login?.access);
    localStorage.setItem("refresh", login?.refresh);
    return router.push("/app");
  }
  isLoading.value = false;
  errorMsg.value = login?.error ?? "Something went wrong, Please try again";
};
</script>

<style lang="css" scoped></style>
