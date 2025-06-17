import { getToken } from "next-auth/jwt";

export async function POST(req) {
  const token = await getToken({ req });

  if (!token || !token.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { summary, description, start, end } = await req.json();

  const event = {
    summary,
    description,
    start: { dateTime: start, timeZone: "Asia/Kolkata" },
    end: { dateTime: end, timeZone: "Asia/Kolkata" },
  };

  const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  const data = await res.json();

  if (!res.ok) {
    return Response.json({ error: data.error }, { status: 500 });
  }

  return Response.json({ success: true, event: data });
}
