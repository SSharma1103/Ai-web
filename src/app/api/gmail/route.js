import { getToken } from "next-auth/jwt";
import { sendEmail } from "@/lib/gmail";

export async function POST(req) {
  const token = await getToken({ req });

  if (!token || !token.accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { to, subject, message } = await req.json();

  try {
    const result = await sendEmail(token.accessToken, to, subject, message);
    return Response.json({ success: true, result });
  } catch (err) {
    return Response.json({ error: err.message });
  }
}
