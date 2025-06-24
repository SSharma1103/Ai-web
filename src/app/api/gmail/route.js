import { getToken } from "next-auth/jwt";
import { sendEmail } from "@/lib/gmail";

export async function POST(req) {
  const token = await getToken({ req });

  if (!token || !token.accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { to, subject, message } = body;

  // Validate 'to' email address
  if (!to || !/\S+@\S+\.\S+/.test(to)) {
    return Response.json({ success: false, error: "Invalid 'to' email address." }, { status: 400 });
  }

  // Validate 'subject'
  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    return Response.json({ success: false, error: "Subject is required." }, { status: 400 });
  }
  if (subject.length > 255) { // Common length limit for subjects
    return Response.json({ success: false, error: "Subject exceeds maximum length of 255 characters." }, { status: 400 });
  }

  // Validate 'message'
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return Response.json({ success: false, error: "Message is required." }, { status: 400 });
  }
  if (message.length > 10000) { // Arbitrary limit, adjust as needed
    return Response.json({ success: false, error: "Message exceeds maximum length of 10000 characters." }, { status: 400 });
  }

  try {
    // Pass validated and trimmed inputs to the sendEmail function
    const result = await sendEmail(token.accessToken, to.trim(), subject.trim(), message.trim());
    return Response.json({ success: true, result });
  } catch (err) {
    console.error("Error sending email:", err); // Log the full error on the server
    // Return a generic error message to the client
    return Response.json({ success: false, error: "Failed to send email. Please try again later." }, { status: 500 });
  }
}
