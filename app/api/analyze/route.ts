// /api/analyze.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateInsight } from '../../../components/insightGenerator';

export async function POST(req: NextRequest) {
  try {
    const { csvData } = await req.json();

    if (!csvData) {
      return NextResponse.json({ error: 'CSV data is required' }, { status: 400 });
    }

    const result = await generateInsight(csvData);

    if (result.type === 'success') {
      return NextResponse.json(result.insight, { status: 200 });
    } else if (result.type === 'validation-error') {
      return NextResponse.json({ error: 'Validation Error', details: result.value }, { status: 400 });
    } else if (result.type === 'parse-error') {
      return NextResponse.json({ error: 'Parse Error', details: result.text }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown Error', details: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server Error', details: error }, { status: 500 });
  }
}

// import { CoreMessage, generateText } from 'ai';
// import { openai } from '@ai-sdk/openai'; // Ensure OPENAI_API_KEY environment variable is set

// export async function POST(req: Request) {
//     const { messages }: { messages: CoreMessage[] } = await req.json();

//     const { text } = await generateText({
//     model: openai('gpt-4-turbo'),
//     messages,
//   });

//   console.log(text);
//   return text // result.toAIStreamResponse();

// }
