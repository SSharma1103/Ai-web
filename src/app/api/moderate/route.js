import { GoogleGenerativeAI } from "@google/generative-ai"; // or use OpenAI if preferred

export async function POST(req) {
  const { text } = await req.json();

  // Replace with your actual moderation logic
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Analyze the following YouTube comment and determine whether it's hate speech, spam, or off-topic. If none, say "Safe".

Comment:
"${text}"`;

  const result = await model.generateContent(prompt);
  const output = result.response.text();

  return Response.json({ result: output.trim() });
}
