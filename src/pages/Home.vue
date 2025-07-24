<template>
  <div
    class="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center"
  >
    <h1 class="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
      Welcome to My Vue App
    </h1>
    <p class="text-lg md:text-xl text-gray-600 max-w-xl mb-6">
      This is a simple homepage built with Vue 3, Vite, and Tailwind CSS. Start
      building your app here!
    </p>
    <router-link to="/login" class="btn btn-primary"> Go to Login </router-link>
  </div>
</template>
