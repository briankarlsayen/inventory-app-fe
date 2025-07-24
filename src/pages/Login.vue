<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm bg-white p-4 rounded shadow">
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
        <div class="mb-4 pb-4">
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
        <button type="submit" class="btn btn-primary w-full">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const username = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("login!");
  const isLogged = true;
  if (isLogged) {
    return router.push("/");
  }
};
</script>

<style lang="css" scoped></style>
