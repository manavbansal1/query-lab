import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { query, error, schema } = await req.json();

    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
        The user tried this database query:
        ${query}

        Schema:
        ${JSON.stringify(schema, null, 2)}

        Error:
        ${error || "No error"}

        👉 Explain what went wrong and how to fix it in plain language.
      `,
    });

    return new Response(
      JSON.stringify({ answer: response.output[0].content[0].text }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}