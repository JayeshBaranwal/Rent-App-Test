import axios from "axios";

const sendReminder = async (phone, message) => {
  try {
    await axios.post(
      "https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json",
      {
        To: phone,
        From: "your-twilio-number",
        Body: message,
      },
      {
        auth: {
          username: "YOUR_ACCOUNT_SID",
          password: "YOUR_AUTH_TOKEN",
        },
      }
    );
    alert("Reminder sent!");
  } catch (err) {
    console.error("Failed to send reminder:", err);
  }
};

export default sendReminder;
