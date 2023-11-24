<template>
  <div class="container mx-auto my-8 space-y-8">
    <!-- Header / Navigation bar -->
    <header class="flex justify-between items-end">
      <router-link to="/" class="text-5xl font-cursive font-bold">
        <span class="px-4 bg-yellow-200 cursor-pointer"
          >too long, didn't watch</span
        >
      </router-link>
      <router-link
        to="/about/"
        class="underline underline-offset-2 uppercase cursor-pointer decoration-2 hover:text-blue-400 transition ease-in-out duration-150"
      >
        About
      </router-link>
    </header>

    <router-view></router-view>
  </div>
</template>
