<a>
  <h1 align="left">SmartChart</h1>
</a>

## Introduction 

SmartChart is a basic proof-of-concept AI app that can analyze data and generate relevant charts based on identified insights.

Currently built using [Next.js](https://nextjs.org/), [OpenAI](https://sdk.vercel.ai/providers/ai-sdk-providers/openai), and deployed on [Vercel](https://vercel.com/docs).

Shadcn/ui is used for easy, clean UI components - including new [Charts](https://ui.shadcn.com/charts) components uses [Recharts](https://recharts.org/en-US/) under the hood. 

<a>
    <img alt="SmartChart - Instant insights and visualizations from your csv data" src="/public/smartchart.png">
</a>

## Main Features

* Simple UI to drag-and-drop or select csv files from local computer
* Dynamically render table based on provided data
* Vercel AI SDK (currently w/ OpenAI `gpt-4-turbo`) to analyze csv data and "identify insights" using [generate structured output](https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data) based on prompt + csv data
* Creating chart with summary of analysis insights based on structured response

## To-Do:

- [ ] Support additional chart types (bar, scatter, radial, etc)
- [ ] Support multiple "insights" with 2+ charts
- [ ] Optimize model + prompt for ideal cost/performance
- [ ] Add optional data samples to easily demo app
- [ ] Improve layout and styling
