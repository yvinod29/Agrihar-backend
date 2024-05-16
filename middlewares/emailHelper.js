// emailHelper.js
import nodemailer from 'nodemailer';

const emailConfig = {
  service: 'gmail',
  auth: {
    user: 'vinuureddy555@gmail.com', // Replace with your email
    pass: 'pwiz rvxa sots bcyy', // Replace with your email password
  },
};

const transporter = nodemailer.createTransport(emailConfig);

export const sendPasswordResetCodeEmail = async (email, resetCode) => {
  try {
    const mailOptions = {
      from: 'vinuureddy555@gmail.com', // Replace with your email
      to: email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${resetCode}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendEventRegistrationConfirmationEmail = async (email, eventName, sessionDate, sessionTimings, numberOfGuests) => {
    try {
      const mailOptions = {
        from: 'vinuureddy555@gmail.com', // Replace with your email
        to: email,
        subject: 'Event Registration Confirmation',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2 style="color: #333;">Event Registration Confirmation</h2>
            <p>Dear Participant,</p>
            <p>Thank you for registering for the event "${eventName}". Below are the details of your registration:</p>
            <ul>
              <li><strong>Event Name:</strong> ${eventName}</li>
              <li><strong>Date:</strong> ${sessionDate}</li>
              <li><strong>Timings:</strong> ${sessionTimings}</li>
              <li><strong>Number of Guests:</strong> ${numberOfGuests}</li>
              <li><strong>Registered Email:</strong> ${email}</li>
            </ul>
            <p>We look forward to seeing you at the event!</p>
            <p>Best regards,</p>
            <p>Your Event Team</p>
          </div>
        `,
      };
  
      const info = await transporter.sendMail(mailOptions);
  
      console.log('Event registration confirmation email sent:', info.response);
  
      return true;
    } catch (error) {
      console.error('Error sending event registration confirmation email:', error);
      return false;
    }
};
