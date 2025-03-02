import { useState } from "react";
import { recordNewReport } from "../../firebase";

const SendEmail = ({ to, subject, message, disabled /*accessToken*/ }) => {
  const [status, setStatus] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  const sendEmail = async () => {
    if (!accessToken) {
      setStatus("❌ Not authorized. Please sign in first.");
      return;
    }

    const emailContent = [
      `To: ${to}`,
      "Subject: " + subject,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=\"UTF-8\"",
      "",
      message,
    ].join("\n");

    const base64EncodedEmail = btoa(unescape(encodeURIComponent(emailContent))).replace(/\+/g, "-").replace(/\//g, "_");

    try {
      // Send email using the Gmail API with fetch
      const response = await fetch("https://www.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raw: base64EncodedEmail,
        }),
      });

      if (response.ok) {
        // Record the report in Firebase
        try {
          await recordNewReport();
          setStatus("✅ Email sent successfully!");
        } catch (firebaseErr) {
          console.error("Error recording report:", firebaseErr);
          setStatus("✅ Email sent successfully! (Stats not updated)");
        }
      } else {
        const errorData = await response.json();
        setStatus(`❌ Error sending email: ${errorData.error.message}`);
      }
    } catch (err) {
      setStatus("❌ Error sending email: " + err.message);
      console.error("Send Email Error:", err);
    }
  };



  return (
    <div>
      <button className="send-button" onClick={sendEmail}>
        Send Email
      </button>
      <p>{status}</p>
    </div>
  );
};

export default SendEmail;
