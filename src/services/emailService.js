import nodemailer from "nodemailer";

const { BASE_URL, UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
});

export const sendVerificationEmail = async ({ email, verificationToken }) => {
  const verificationLink = `${BASE_URL}/api/auth/verify/${verificationToken}`;

  await transporter.sendMail({
    from: UKR_NET_EMAIL,
    to: email,
    subject: "Verify your email",
    html: `
      <h1>Email verification</h1>
      <p>Please follow the link below to verify your email:</p>
      <a href="${verificationLink}" target="_blank" rel="noopener noreferrer">
        Verify email
      </a>
    `,
    text: `Verify your email: ${verificationLink}`,
  });
};
