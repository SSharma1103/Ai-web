import { GoogleGenerativeAI } from "@google/generative-ai";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/mongodb";

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
    const collection = db.collection("commentModerationLimits");

    // Check usage limit
    const usage = await collection.findOne({ email });
    if (usage?.count >= 10) {
      return new Response(
        JSON.stringify({ error: "Request limit reached (10/10)" }),
        { status: 429 }
      );
    }

    // Parse body
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid or missing comment text" }),
        { status: 400 }
      );
    }

    // Construct prompt
    const prompt = `Analyze the following YouTube comment and determine whether it's hate speech, spam, or off-topic. If none, say "Safe".\n\nComment:\n"${text}"`;

    // Call Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const output = result.response.text().trim();

    // Update usage count
    await collection.updateOne(
      { email },
      { $inc: { count: 1 }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );

    return new Response(JSON.stringify({ result: output }), { status: 200 });
  } catch (err) {
    console.error("Moderation API error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
