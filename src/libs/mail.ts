import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: Bun.env.SMTP_HOST as string,
  port: parseInt(Bun.env.SMTP_PORT as string) || 465,
  secure: true,
  auth: {
    user: Bun.env.SMTP_USERNAME as string,
    pass: Bun.env.SMTP_PASSWORD as string,
  },
});

export { transporter };
