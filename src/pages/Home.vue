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
// const film_links = computed(() => {
//   if (film) {
//     return {
//       imdb: film.value.external_links[0],
//       tmdb: film.value.external_links[1],
//     };
//   }
//   return null;
// });
</script>

<template>
  <!-- Film Details -->
  <template v-if="film">
    <div class="sticky top-4">
      <div class="border-2 border-black bg-white max-h-[512px] lg:max-h-none overflow-y-scroll">
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
        <div class="flex flex-wrap p-4 space-y-4">
          <div class="w-full sm:w-1/5 p-2">
            <div class="flex justify-center">
              <img
                class="w-[250px] border-solid border-2 border-black"
                :src="`/images/posters/${film.film_slug}.jpg`"
              />
            </div>
          </div>
          <div
            class="w-full sm:w-2/5 p-y-2 px-4 md:border-r-2 md:border-dashed md:border-black"
          >
            <div class="space-y-2">
              <h1 class="text-2xl md:text-4xl font-bold">
                {{ film.title }} ({{ film.release_date }})
              </h1>
              <h2 class="font-bold italic">{{ film.synopsis }}</h2>
              <div class="font-normal text-justify">
                {{ film.description }}
              </div>

              <div class="flex items-top">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 fill-current text-blue-400 hover:text-yellow-200 transition ease-in-out duration-150"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
                <h2 class="ml-2 uppercase font-bold">AI Generated Summary</h2>
              </div>

              <div class="font-normal text-justify">
                {{ film.summary }}
              </div>

              <!-- <div class="flex flex-auto space-x-2"> -->
              <!--   <img -->
              <!--     class="h-[32px] cursor-ponnter" -->
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
                  <span class="p-2 text-sm bg-gray-200">
                    {{ genre }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full sm:w-2/5 p-y-2 px-4 max-h-[600px] overflow-y-auto">
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

  <div class="grid grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
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
</template>
