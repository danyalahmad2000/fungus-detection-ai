import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  
  try {
    const { name, email, phone, symptoms } = await request.json();
    console.log("reached here")

    //check if pass is null
    // if (!process.env.EMAIL_PASS)
    //   return;

    // Setup the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // change this to your preferred email provider
      auth: {
        user: process.env.EMAIL_USER, // Email from which to send
        pass: process.env.EMAIL_PASS, // Email password or app-specific password
      },
    });

    // Send the email
    await transporter.sendMail({
      //check again: this should be sender mail and to: should be recieving mail
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // the email address where you want to receive the contact form data
      subject: `Contact Us Form`,
      html: `
        <p><strong>Full Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Number:</strong> ${phone}</p>
        <p><strong>Symptoms:</strong></p>
        <p>${symptoms}</p>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email." },
      { status: 500 }
    );
  }
}