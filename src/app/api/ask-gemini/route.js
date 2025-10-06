import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function POST(req) {
  try {
    const { query, error, schema } = await req.json();

    const prompt = `
You are a database tutor. A student wrote this query:
${query}

Error encountered:
${error}

Database schema:
${schema}

Explain why this error happened and how to fix it.
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash", // or gemini-2.5-flash if available
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    return new Response(
      JSON.stringify({ answer: response.output_text }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
