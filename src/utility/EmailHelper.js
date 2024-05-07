const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport");
require("dotenv").config();

let password = "hhqqbuzrkljidbxl";

let sendEmailUtility = async (emailTo, emailText, emailSub) => {
  let transporter = nodemailer.createTransport(
    smtpTransporter({
      service: "Gmail",
      auth: {
        user: "jahidhasanbabu657@gmail.com",
        pass: password,
      },
    })
  );
  let mailOption = {
    from: "PRODUCT Service <jahidhasanbabu657@gmail.com>",
    to: emailTo,
    subject: emailSub,
    text: emailText,
  };
  return await transporter.sendMail(mailOption);
};

module.exports = sendEmailUtility;
