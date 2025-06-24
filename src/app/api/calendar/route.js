import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    const token = await getToken({ req });

    if (!token || !token.accessToken) {
      return Response.json({ success: false, error: "Unauthorized. No access token." }, { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const { summary, description, start, end } = body;

    // Basic presence validation
    if (!summary || !start || !end) {
      return Response.json({ success: false, error: "Missing required fields: summary, start, and end are required." }, { status: 400 });
    }

    // Validate date formats (ISO 8601)
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
    if (!iso8601Regex.test(start)) {
      return Response.json({ success: false, error: "Invalid start date format. Expected ISO 8601 format (e.g., YYYY-MM-DDTHH:mm:ssZ)." }, { status: 400 });
    }
    if (!iso8601Regex.test(end)) {
      return Response.json({ success: false, error: "Invalid end date format. Expected ISO 8601 format (e.g., YYYY-MM-DDTHH:mm:ssZ)." }, { status: 400 });
    }

    // Optional: Add length validation for summary and description
    if (summary.length > 255) { // Example limit
        return Response.json({ success: false, error: "Summary exceeds maximum length of 255 characters." }, { status: 400 });
    }
    if (description && description.length > 1024) { // Example limit
        return Response.json({ success: false, error: "Description exceeds maximum length of 1024 characters." }, { status: 400 });
    }

    // Ensure start time is before end time
    if (new Date(start) >= new Date(end)) {
      return Response.json({ success: false, error: "Start time must be before end time." }, { status: 400 });
    }

    const event = {
      summary: summary, // Explicitly pass validated fields
      description: description || "", // Use validated description or empty string
      start: { dateTime: start, timeZone: "Asia/Kolkata" }, // Assuming client sends in UTC or a format Google API understands
      end: { dateTime: end, timeZone: "Asia/Kolkata" },   // Same assumption for end time
    };

    const googleRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    const data = await googleRes.json();

    if (!googleRes.ok) {
      const message = data?.error?.message || "Failed to create event";
      return Response.json({ success: false, error: message }, { status: googleRes.status || 500 });
    }

    return Response.json({ success: true, event: data }, { status: 200 });
  } catch (err) {
    // Log the detailed error on the server
    console.error("Error in /api/calendar POST:", err);

    // Check if it's an error from the Google API response parsing or a network issue
    if (err instanceof SyntaxError && err.message.includes("JSON")) {
      // Error parsing Google's response (or our own req.json earlier)
      return Response.json(
        { success: false, error: "Error processing external API response. Please try again later." },
        { status: 502 } // Bad Gateway, as we got an invalid response from upstream
      );
    } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
      // Network error or similar issue with the fetch call to Google
       return Response.json(
        { success: false, error: "Network error communicating with Google Calendar API. Please try again later." },
        { status: 503 } // Service Unavailable
      );
    }

    // For any other unexpected errors, return a generic internal server error
    return Response.json(
      { success: false, error: "An unexpected internal server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
