import fetch from "node-fetch"

export const sendVerificationEmail = async (name, email, verifyUrl) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "JustTakes", email: "contact.justtakes@gmail.com" },
      to: [{ email }],
      subject: "Verify your JustTakes account",
      htmlContent: `
        <h2>Welcome, ${name}!</h2>
        <p>Please confirm your email by clicking the link below:</p>
        <a href="${verifyUrl}" target="_blank">${verifyUrl}</a>
        <br/><p>This link expires in 1 hour.</p>
      `,
    }),
  })

  return response.ok
}
