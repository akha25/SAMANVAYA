const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_EMAIL || 'test_user',
      pass: process.env.SMTP_PASSWORD || 'test_pass'
    }
  });

  // Define email options
  const mailOptions = {
    from: `${process.env.FROM_NAME || 'Samanvaya Health Connect'} <${process.env.FROM_EMAIL || 'noreply@samanvaya.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html // Optional HTML support
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
