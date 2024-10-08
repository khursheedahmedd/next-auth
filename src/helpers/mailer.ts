import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "53823e865627f6",
        pass: "2178e77b0a6e5f",
      },
    });

    const mailOptions = {
      from: "",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset Password",
      html: `<p>Click<a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"> here </a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in browser <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken} </p> `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (err: any) {
    throw new Error(err);
  }
};
