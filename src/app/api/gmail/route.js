import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/mongodb";
import { sendEmail } from "@/lib/gmail";

export async function POST(req) {
  try {
    const token = await getToken({ req });

    if (!token || !token.accessToken || !token.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    let to, subject, message;
    try {
      const body = await req.json();
      ({ to, subject, message } = body);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid JSON payload" }), { status: 400 });
    }

    const email = token.email;

    const client = await clientPromise;
    const db = client.db("ai_web");
    const collection = db.collection("emailLimits");

    const userLimit = await collection.findOne({ email });

    if (userLimit && userLimit.count >= 10) {
      return new Response(JSON.stringify({ error: "Email limit reached (10/10)" }), { status: 429 });
    }

    const result = await sendEmail(token.accessToken, to, subject, message);

    await collection.updateOne(
      { email },
      { $inc: { count: 1 }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );

    return Response.json({ success: true, result });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Server error", stack: err.stack }),
      { status: 500 }
    );
  }
}
