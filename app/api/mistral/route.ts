import { NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question } = body;
    const apiKey = process.env.MISTRAL_AI_API_KEY;

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const client = new Mistral({ apiKey: apiKey });

    const chatResponse = await client.chat.complete({
      model: "mistral-tiny",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `This question is in HTML format. Please convert the question into standard text and answer the question. The question is ${question}`,
        },
      ],
    });

    // console.log("Mistral chat: ", chatResponse.choices[0].message.content);

    return NextResponse.json(
      { mistralAnswer: chatResponse.choices[0].message?.content },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
