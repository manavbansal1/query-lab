import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { query, error, schema } = await req.json();

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Create the prompt
    const prompt = `
You are a helpful database query assistant. A user tried to execute a database query but encountered an error.

Database Query:
${query}

Database Schema:
${JSON.stringify(schema, null, 2)}

Error Message:
${error || "No error provided"}

Please explain:
1. What went wrong with this query
2. How to fix it
3. Provide a corrected version of the query if possible

Keep your explanation clear and concise.
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return new Response(
      JSON.stringify({ answer: text }),
      { 
        headers: { "Content-Type": "application/json" }, 
        status: 200 
      }
    );
  } catch (err) {
    console.error("Gemini API Error:", err);
    return new Response(
      JSON.stringify({ 
        error: err.message || "Failed to get AI assistance" 
      }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}