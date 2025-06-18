export async function sendEmail(accessToken, to, subject, message) {
  const email = [
    `To: ${to}`,
    "Content-Type: text/plain; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  const encodedMessage = Buffer.from(email).toString("base64").replace(/\+/g, "-").replace(/\//g, "_");

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: encodedMessage }),
  });

  if (!res.ok) throw new Error("Failed to send email");
  return await res.json();
}
