<script setup lang="tsx">
import { useRouter } from "vue-router";

const router = useRouter();

const goToLogin = () => {
  return router.push("/login");
};
</script>
<template>
  <div class="container">
    <div class="box-container">
      <div class="content-container">
        <div class="flex flex-col gap-2">
          <span class="md:text-[80px] text-4xl font-bold">404</span>
          <span class="md:text-sm text-xs">
            Sorry. We cannot find the page you are looking for.
          </span>
        </div>
        <button class="btn btn-primary" @click="goToLogin">Go to login</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 2rem;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 850px;
  width: 80%;
  padding: 1rem;
  gap: 2rem;
  border-radius: 12px;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  padding-bottom: 1.5rem;
}

.box1 {
  height: 100%;
  background-color: red;
  width: 100%;
}
.box2 {
  height: 100%;
  background-color: blue;
  width: 100%;
}

.not-found-img {
  width: 200px;
  height: 200px;
}
</style>
