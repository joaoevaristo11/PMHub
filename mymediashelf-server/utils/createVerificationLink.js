export const createVerificationLink = (token) => {
  const frontendUrl =
    process.env.NODE_ENV === "production"
      ? "https://justtakes.vercel.app"
      : "http://localhost:5173"

  return `${frontendUrl}/verify?token=${token}`
}
