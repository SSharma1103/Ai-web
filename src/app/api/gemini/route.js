import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default genAI;


export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const { prompt } = body;

    // Validate prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return Response.json({ success: false, error: "Prompt is required and must be a non-empty string." }, { status: 400 });
    }

    // Example: Limit prompt length (e.g., 4096 characters)
    // Adjust this limit based on your needs and the Gemini API's capabilities/pricing.
    const MAX_PROMPT_LENGTH = 4096;
    if (prompt.length > MAX_PROMPT_LENGTH) {
      return Response.json({ success: false, error: `Prompt exceeds maximum length of ${MAX_PROMPT_LENGTH} characters.` }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Use the validated and trimmed prompt
    const result = await model.generateContent(prompt.trim());
    const text = await result.response.text();

    return new Response(JSON.stringify({ success: true, result: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("Error in /api/gemini POST:", err); // Log the full error
    return new Response(JSON.stringify({ success: false, error: "Error processing Gemini request. Please try again later." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
