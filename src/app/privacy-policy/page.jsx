"use client";



export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        This Privacy Policy explains how your information is collected, used, and shared when you use our application.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        When you sign in with Google, we may access your email address and basic profile information. With your
        permission, we may also access your Gmail to send emails and your calendar to manage events.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>To authenticate and authorize your Google account</li>
        <li>To allow sending emails or creating calendar events</li>
        <li>To provide and improve app functionality</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
      <p className="mb-4">
        We do not sell or share your data with third parties. Any data you authorize is used solely for the features
        you engage with inside the app.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We take security seriously. Data is transmitted securely and never stored unless absolutely necessary — and
        only with your permission.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Choices</h2>
      <p className="mb-4">
        You can revoke access at any time from your Google Account settings. You may also contact us to delete any
        information associated with your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy. Updates will be reflected on this page with a revised "last updated" date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact</h2>
      <p>
        If you have any questions, please contact us at{" "}
        <a href="shivamsharma11032009@gmail.com" className="underline text-blue-400">
          shivamsharma11032009@gmail.com
        </a>
        .
      </p>
    </div>
  );
}
