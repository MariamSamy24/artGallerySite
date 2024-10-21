const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

exports.sendRegistrationEmail = async (email, name) => {
  const mailOptions = {
    from: 'no-reply@art-gallery.com',
    to: email,
    subject: 'Welcome to Our App!',
    text: `Hello ${name},\n\nThank you for registering at our app. We are excited to have you onboard!\n\nBest regards,\nThe Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


exports.sendOrderConfirmationEmail = async (email, orderId, totalAmount, user_name) => {
  const mailOptions = {
    from: 'no-reply@art-gallery.com',
    to: email,  
    subject: 'Order Confirmation',
    text: `Dear ${user_name},\n\nThank you for your order! Your order number is ${orderId} and the total amount is $${totalAmount}. We are processing your order and will update you once it is shipped.\n\nBest regards,\nYour Store Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};