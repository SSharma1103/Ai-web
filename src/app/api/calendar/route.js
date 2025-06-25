import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/mongodb"; // Make sure this exists and is correct

export async function POST(req) {
  try {
    const token = await getToken({ req });

    if (!token || !token.accessToken || !token.email) {
      return Response.json(
        { success: false, error: "Unauthorized. No access token." },
        { status: 401 }
      );
    }

    // MongoDB setup
    const client = await clientPromise;
    const db = client.db("ai_web");
    const collection = db.collection("calendarLimits");

    const email = token.email;

    // Check existing usage count
    const usage = await collection.findOne({ email });
    if (usage?.count >= 10) {
      return Response.json(
        { success: false, error: "Request limit reached (10/10)" },
        { status: 429 }
      );
    }

    // Parse request JSON
    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { summary, description, start, end } = body;

    if (!summary || !start || !end) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = {
      summary,
      description,
      start: { dateTime: start, timeZone: "Asia/Kolkata" },
      end: { dateTime: end, timeZone: "Asia/Kolkata" },
    };

    // Send to Google Calendar API
    const googleRes = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    const data = await googleRes.json();

    if (!googleRes.ok) {
      const message = data?.error?.message || "Failed to create event";
      return Response.json(
        { success: false, error: message },
        { status: googleRes.status || 500 }
      );
    }

    // Increment user count in DB
    await collection.updateOne(
      { email },
      { $inc: { count: 1 }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );

    return Response.json({ success: true, event: data }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
