const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@swasthsetu.com',
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email send error:', error);
  }
};

const sendConsultationConfirmation = async (email, doctorName, dateTime) => {
  const html = `
    <h2>Consultation Confirmed</h2>
    <p>Your consultation with Dr. ${doctorName} is scheduled for:</p>
    <p><strong>${new Date(dateTime).toLocaleString()}</strong></p>
    <p>Thank you for using SwasthSetu!</p>
  `;
  await sendEmail(email, 'Consultation Confirmation', html);
};

const sendPasswordReset = async (email, resetLink) => {
  const html = `
    <h2>Password Reset Request</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>This link expires in 1 hour.</p>
  `;
  await sendEmail(email, 'Password Reset', html);
};

module.exports = {
  sendEmail,
  sendConsultationConfirmation,
  sendPasswordReset,
};