import { NextResponse } from "next/server";
import OpenAI from "openai";

async function getfunFactsFromOpenAI(topic: string) {
  const openai = new OpenAI({
    apiKey: "",
  });
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You will be provided with a topic and your task will be to generate 5 fun facts as fun_facts of around 10 words",
      },
      {
        role: "user",
        content: `Topic ${topic}`,
      },
    ],
  });
  return res.choices[0].message.content;
}

export async function POST(req: Request) {
  const resBody = await req.json();

  const res = await getfunFactsFromOpenAI(resBody["topic"] ?? "");

  return NextResponse.json({
    result: res,
  });
}
