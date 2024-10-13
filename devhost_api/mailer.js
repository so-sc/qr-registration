const mailgun = require('mailgun-js');
require('dotenv').config();
const mg = mailgun({
  apiKey: process.env.mailerAPI,
  domain: 'devhost.sosc.org.in',
});
const evn ={
    "101": "CSS action",
    "102": "CodeForge",
    "103": "Capture the Flag",
    "104": "Sightless Synatax",
    "105": "Tech-Pitch",
    "106": "BGMI: Battlegrounds Mobile India",
    "107": "Valorant",
    "108": "RoboSumo (<5KG)",
    "109": "RoboSumo (>5KG)",
    "110": "LineFollower",
    "111": "RoboSoccer",
  }
const sendEmail = (to, subject, body) => {
  const data = {
    from: 'noreply@devhost.sosc.org.in',
    to: to,
    subject: subject,
    html: body,
  };
  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', body);
    }
  });
};
const genBody = (user) => {
    const evList = user.events.map(event => `<li style="color: #A4D600; font-size: 16px; margin: 5px 0;">${evn[event]}</li>`).join('');
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>DevHost 2024 Confirmation</title>
      </head>
      <body style="background-color: #1E1E1E; color: #B0B0B0; font-family: 'Trebuchet MS','Arial',sans-serif; margin: 0; padding: 20px;">

          <table width="100%" style="border: 1px solid #A4D600; background-color: #2D2D2D; border-collapse: collapse; margin-bottom: 15px;">
              <tr>
                  <td style="padding: 20px; text-align: center;">
                      <img src="https://devhost.sosc.org.in/logo_h.png" alt="DevHost Banner" style="max-width: 100%; height: auto;">
                  </td>
              </tr>
          </table>

             <table width="100%">
          	<tr>
          	<td width="60%"></td>
            <td width="40%"><img src="https://devhostapi.sosc.org.in/genqr?gid=${user.gID}" alt="QR Code" style="width: auto;height: 100px; border-radius: 10px" align="right"></td>
        </tr>
          </table>

          <div style="margin-top: 20px; font-size: 18px;">
              <b>Dear ${user.username},</b><br><br>
              Thank you for registering for DevHost 2024. We are pleased to welcome you aboard. Below, you will find a list of all the events you have successfully registered for:
              <ul style="margin-top: 10px; list-style-type: disc; padding-left: 20px;">
              ${evList}  
              </ul>
          </div>

          <div style="margin-top: 20px; font-size: 16px; color: #B0B0B0; width: 100%">
              If you have any questions or require further assistance, please do not hesitate to reach out to us:<br><br>
            <table width="100%">
              <tr>
                <td>
              Best regards,<br>
              <b>DevHost Team</b><br>
              sosc@sahyadri.edu.in<br>
              +91 7892759314
                </td>
                <td>
           <img src="https://devhost.sosc.org.in/sosc_logo.png" alt="sosc logo" style="width: auto;height: 100px;" align="right">
                </td>
              </tr>
            </table>
          </div>
      </body>
      </html>
    `;
  };
  
const sendConf = (user) => {
  const body = genBody(user);
  console.log(body);
  sendEmail(user.email, "Devhost Confirmation", body);
};
module.exports = {
    sendConf
};
