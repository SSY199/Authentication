import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{email}];
    try {
      const response = await mailtrapClient.send({
        from: sender,
        to: recipient,
        subject: "Email Verification",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        category: "Email Verification",
      });
      console.log("Verification email sent successfully:", response);
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw new Error("Failed to send verification email");
    }
}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{email}];
  
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
    template_uuid: "2884fddd-231d-4f08-8b97-3357221d1d7a",
    template_variables: {
      "name": name,
      "dashboard_link": "Test_Dashboard_link",
      "help_center": "Authentication"
    }
    })
    
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{email}];
  
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully:", response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
}

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{email}];
  
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Success",
    });
    console.log("Password reset success email sent successfully:", response);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error("Failed to send password reset success email");
  }
}