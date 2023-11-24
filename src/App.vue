<template>
  <div class="mx-2 md:container md:mx-auto lg:mx-auto my-4 md:my-8 space-y-8">
    <!-- Header / Navigation bar -->
    <header class="flex justify-between items-end">
      <router-link to="/" class="text-3xl md:text-5xl font-cursive font-bold">
        <span class="px-4 bg-yellow-200 cursor-pointer"
          >too long, didn't watch</span
        >
      </router-link>
      <router-link
        to="/about/"
        class="text-sm md:text-base underline underline-offset-2 uppercase cursor-pointer decoration-2 hover:text-blue-400 transition ease-in-out duration-150"
      >
        About
      </router-link>
    </header>

    <router-view></router-view>
  </div>
</template>
