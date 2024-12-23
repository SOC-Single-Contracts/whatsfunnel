import express from "express";
import bodyParser from "body-parser";
import connectDB from "./db/db.js";
import Payment from "./models/Payment.js";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@whatsfunnels.ai",
    pass: "WhatsFunnels2024!",
  },
});

// Webhook endpoint
app.post("/webhook", async (req, res) => {
  try {
    const {
      affiliate,
      buyer_address,
      buyer_street,
      buyer_house_number,
      buyer_city,
      buyer_state,
      buyer_company_name,
      buyer_country,
      buyer_country_code,
      buyer_email,
      buyer_firstname,
      buyer_id,
      buyer_lastname,
      buyer_phone_number,
      buyer_zipcode,
      order_id,
      product_id,
    } = req.body;

    console.log("Webhook received with the following data:");
    console.log(req.body);

    // Basic validation
    if (!order_id || !product_id || !buyer_email) {
      return res.status(400).json({
        status: "error",
        message:
          "Missing required fields: order_id, product_id, or buyer_email",
      });
    }

    // Password creation
    const randomPart = Math.random().toString(36).slice(2, 12);
    const buyer_password = `${order_id}.${randomPart}`;

    // Save data to the database
    const payment = new Payment({
      affiliate,
      buyer_address,
      buyer_street,
      buyer_house_number,
      buyer_city,
      buyer_state,
      buyer_company_name,
      buyer_country,
      buyer_country_code,
      buyer_email,
      buyer_password,
      buyer_firstname,
      buyer_id,
      buyer_lastname,
      buyer_phone_number,
      buyer_zipcode,
      order_id,
      product_id,
    });

    const savedPayment = await payment.save();
    console.log("Saved payment data:", savedPayment);

    if (!savedPayment) {
      return res.status(500).json({
        status: "error",
        message: "Error saving payment data to the database",
      });
    }

    const mailOptions = {
      from: "info@whatsfunnels.ai",
      to: buyer_email,
      subject: "Login details",
      text: `
      Here is your login details:
      Email: ${buyer_email}.
      Password: ${buyer_password}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    // Respond to the webhook sender
    res.status(200).json({
      status: "success",
      message: "Webhook processed, payment data saved, and email sent",
      data: req.body,
    });
  } catch (error) {
    console.error("Error processing webhook:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Webhook server running on http://localhost:${PORT}`);
});
