const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const sendgridOptions = {
  auth: {
    api_key: process.env.SENDGRID_API_KEY,
  },
};

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport(
    sendgridTransport(sendgridOptions)
  );

  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: options.to,
    subject: options.subject,
    text: options.text,
  });
};

module.exports = sendEmail;
