# Too Long Didn't Watch

Explore LLM generated movie summaries powered by OpenAI's GPT.

<img width="1400" alt="Screenshot 2023-11-24 at 2 56 08 PM" src="https://github.com/cmpadden/too-long-didnt-watch/assets/5807118/bd5bd3cf-c21c-40c9-a575-3fbde29e4c1e">

## Development

```sh
npm run dev
```

## Deployment

```sh
npm run build
# &
npm run preview
```

For more information on deployment, please refer to the official guide:

https://vitejs.dev/guide/static-deploy.html#github-pages

## Background

This website is user-facing portion of my solution to the [Dagster
Essentials](https://github.com/cmpadden/dagster-essentials-capstone/) capstone project.
It demonstrates the power of asset based data pipelines. Data was collected from
Letterboxd and OpenSubtitles, summaries were generated using LangChain and OpenAI's GPT
models, and finally exported to be used on this website.
