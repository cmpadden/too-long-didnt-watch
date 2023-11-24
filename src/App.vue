<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

/**
 * helper function to zip two arrays
 */
const zip = (a, b) => a.map((k, i) => [k, b[i]]);

const selected_index = ref(0);
const films = ref();

onMounted(async () => {
  const response = await fetch("/data/film_details.json");
  films.value = await response.json();
});

/**
 * Currently selected film.
 */
const film = computed(() => {
  if (films && films.value) {
    return films.value[selected_index.value];
  }
  return null;
});

/**
 * List of genres with "themes" removed.
 *
 * Note: this logic should be moved to data preparation...
 */
const film_genres = computed(() => {
  if (film) {
    const zs = zip(film.value.genre_links, film.value.genre_names);
    return zs.filter((g) => g[0].includes("/genre/")).map((g) => g[1]);
  }
  return null;
});

/**
 * External links converted from array to dictionary.
 */
const film_links = computed(() => {
  if (film) {
    return {
      imdb: film.value.external_links[0],
      tmdb: film.value.external_links[1],
    };
  }
  return null;
});
</script>

<template>
  <div class="container mx-auto my-8 space-y-8">
    <!-- Header / Navigation bar -->
    <header class="flex justify-between items-end">
      <h1 class="text-5xl font-cursive font-bold">
        <span class="px-4 bg-yellow-200 cursor-pointer"
          >too long, didn't watch</span
        >
      </h1>
      <span
        href="/about"
        class="underline underline-offset-2 uppercase cursor-pointer decoration-2 hover:text-blue-400 transition ease-in-out duration-150"
      >
        About
      </span>
    </header>

    <!-- Film Details -->
    <template v-if="film">
      <div class="sticky top-4">
        <div class="border-2 border-black bg-white">
          <div class="border-solid border-b-2 border-black">
            <div class="flex py-2 px-4">
              <div class="ml-auto">
                <span
                  class="cursor-pointer hover:text-red-800"
                  @click="selected_index = -1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap p-4">
            <div class="w-full md:w-1/5 p-2">
              <div class="flex justify-center">
                <img
                  class="w-[250px] border-solid border-2 border-black"
                  :src="`/images/posters/${film.film_slug}.jpg`"
                />
              </div>
            </div>
            <div
              class="w-full md:w-2/5 p-y-2 px-4 md:border-r-2 md:border-dashed md:border-black"
            >
              <div class="space-y-2">
                <h1 class="text-4xl font-bold">
                  {{ film.title }} ({{ film.release_date }})
                </h1>
                <h2 class="font-bold italic">{{ film.synopsis }}</h2>
                <div class="font-normal text-justify">
                  {{ film.description }}
                </div>

                <h2 class="uppercase font-bold">AI Summary</h2>

                <div class="font-normal text-justify">
                  {{ film.summary }}
                </div>

                <!-- <div class="flex flex-auto space-x-2"> -->
                <!--   <img -->
                <!--     class="h-[32px] cursor-pointer" -->
                <!--     src="/images/imdb-180px.png" -->
                <!--     :href="film_links.imdb" -->
                <!--   /> -->
                <!--   <img -->
                <!--     class="h-[32px] cursor-pointer" -->
                <!--     src="/images/tmdb-180px.png" -->
                <!--     :href="film_links.tmdb" -->
                <!--   /> -->
                <!-- </div> -->

                <div class="flex flex-wrap">
                  <div
                    v-for="(genre, index) in film_genres"
                    :key="index"
                    :class="{ 'pl-0': index === 0 }"
                    class="px-2"
                  >
                    <span class="p-2 bg-gray-200">
                      {{ genre }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-full md:w-2/5 p-y-2 px-4 max-h-[450px] overflow-y-auto"
            >
              <div class="space-y-2">
                <h2 class="uppercase font-bold">Cast</h2>
                <table class="">
                  <tr
                    v-for="([name, title], index) in zip(
                      film.cast_details.name,
                      film.cast_details.title,
                    )"
                    :key="index"
                  >
                    <td class="border-b pr-2">{{ name }}</td>
                    <td class="border-b">{{ title }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      <div
        v-for="(film, index) in films"
        @click="selected_index = index"
        :key="index"
        class="w-full flex justify-center"
      >
        <img
          class="cursor-pointer w-[250px] hover:ring-4 hover:ring-yellow-200"
          :class="{
            'ring-4 ring-yellow-200': selected_index == index,
            'border-2 border-solid border-black': selected_index !== index,
          }"
          :src="`/images/posters/${film.film_slug}.jpg`"
        />
      </div>
    </div>
  </div>
</template>
