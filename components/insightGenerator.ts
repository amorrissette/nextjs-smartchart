// insightGenerator.ts

import { openai } from '@ai-sdk/openai';
import { JSONParseError, TypeValidationError, generateObject } from 'ai';
import { z } from 'zod';

const insightSchema = z.object({
  insights: z.array(
    z.object({
      finding: z.string(),
      description: z.string(),
      chartData: z.unknown(), // placeholder - couldn't get schema validation working well yet
      chartType: z.string(),
      chartTitle: z.string(),
      xAxis: z.string(),
    })
  )
});

type Insight = z.infer<typeof insightSchema>;

export async function generateInsight(csvData: string): Promise<
  | { type: 'success'; insight: Insight }
  | { type: 'parse-error'; text: string }
  | { type: 'validation-error'; value: unknown }
  | { type: 'unknown-error'; error: unknown }
> {
  try {
    const result = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: insightSchema,
      prompt: `Thoroughly analyze the CSV Data included below 
      and determine the most important insight 
      and what type of visualization 
      (one of chartType: "AreaChart", "LineChart", "BarChart") 
      would most effectively communicate this insight.
      Please break up any dates provided in csv data to separate year, month, day 
      in to separate columns before analyzing as applicable. 
      Additionally provide a chart title, an insight summary header
      and a comprehensive description of the finding.
      Finally include a chartData array such that 
      each data point is an object in an array similar to the example below:
      "chartData": [
         { "month": "January", "2021": 15000, "2022": 16000, "2023": 17000 },
         { "month": "February", "2021": 12000, "2022": 13000, "2023": 14000 }, 
      ]
      Include a xAxis value as well, 
      corresponding to the key in the chartData array that should be used 
      as the x-axis (eg "Date", "Month", "Year", etc). 
      The response should be formatted according 
      to the schema provided.
      \n\nCSV Data:\n${csvData}
      `,
    });
    console.log(result.object)
    return { type: 'success', insight: result.object };
  } catch (error) {
    if (TypeValidationError.isTypeValidationError(error)) {
      return { type: 'validation-error', value: error.value };
    } else if (JSONParseError.isJSONParseError(error)) {
      return { type: 'parse-error', text: error.text };
    } else {
      return { type: 'unknown-error', error };
    }
  }
}