<script setup lang="ts">
import lineage_image from "/images/dagster-asset-lineage.png";
</script>

<template>
  <div class="container mx-auto my-8 space-y-8">
    <div class="sticky top-4">
      <div class="border-2 border-black bg-white p-4 space-y-4">
        <h1 class="text-2xl md:text-4xl font-bold">About</h1>
        <p>
          <em>Too Long, Didn't Watch</em> is the result of a capstone project
          for the
          <a
            class="text-blue-400 underline"
            href="https://courses.dagster.io/courses/dagster-essentials"
            >Dagster Essentials</a
          >
          course. In this course, one learns how to build data pipelines using
          <em>Dagster</em> -- an asset based data orchestrator. To collect the
          required information needed to power this website, Letterboxd, and
          OpenSubtitles were scraped to get film metadata, and subtitles. These
          subtitles were chunked and summarized using LangChain and LLMs
          provided by OpenAI.
        </p>

        <h2 class="text-1xl md:text-2xl font-bold">Source Code</h2>
        <p>
          The source code for both this website, and the Dagster data pipelines
          used to source the data are available on GitHub at:
        </p>

        <ul class="list-disc list-inside">
          <li>
            <a
              class="text-blue-400 underline"
              href="https://github.com/cmpadden/too-long-didnt-watch"
              >/cmpadden/too-long-didnt-watch</a
            >
          </li>
          <li>
            <a
              class="text-blue-400 underline"
              href="https://github.com/cmpadden/dagster-essentials-capstone"
              >/cmpadden/dagster-essentials-capstone</a
            >
          </li>
        </ul>

        <p>
          If you've found the code to be helpful, you're welcome to
          <a
            class="text-blue-400 underline"
            href="https://www.buymeacoffee.com/coltonpadden"
            >buy me a cup of coffee</a
          >!
        </p>

        <h2 class="text-1xl md:text-2xl font-bold">Asset Lineage</h2>
        <img class="border-2 border-black" :src="lineage_image" />
      </div>
    </div>
  </div>
</template>
