import { GoogleGenerativeAI } from "@google/generative-ai";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/mongodb";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const token = await getToken({ req });

    if (!token || !token.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const email = token.email;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("ai_web");
    const collection = db.collection("geminiLimits");

    // Check user's current usage
    const usage = await collection.findOne({ email });
    if (usage?.count >= 10) {
      return new Response(JSON.stringify({ error: "Request limit reached (10/10)" }), { status: 429 });
    }

    // Parse prompt from body
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Invalid or missing prompt" }), { status: 400 });
    }

    // Generate content using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // Update usage count
    await collection.updateOne(
      { email },
      { $inc: { count: 1 }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );

    return new Response(JSON.stringify({ result: text }), { status: 200 });
  } catch (err) {
    console.error("Gemini API error:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), {
      status: 500,
    });
  }
}
