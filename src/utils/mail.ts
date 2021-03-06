import * as nodemailer from 'nodemailer';

// ì¸ì¦ ë©ì¼
export const sendSignUpEmail = async (email: string, name: string, token: string) => {
  
  const redirectURL = `${process.env.CLIENT_ENDPOINT}/checkemail?code=${token}`
  
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      }
    })

    let info = await transporter.sendMail({
      from: `"Code Highð" <${process.env.NODEMAILER_USER}>`,
      to: `${email}`,
      subject: "[Code High] ì´ë©ì¼ ì¸ì¦ì ì§íí´ì£¼ì¸ì.",
      text: ``,
      html: `
      <style>
  .btn-ctf {
    background-color: #2f8c4c;
    color: #ffffff;
    padding: 20px 60px;
    border-radius: 10px;
    text-decoration: none;
  }
  td {
    font-size: 16px;
    line-height: 1.4;
    font-family: Arial, sans-serif;
    padding: {
      top: 0;
      right: 0;
      bottom: 30px;
      left: 0;
    }
  }
</style>

<table border="0" cellpadding="0" cellspacing="0" width="500px">
  <tr>
    <td bgcolor="#ffffff" style="font-size: 0; line-height: 0; height: 0;" height="0">
      <table>
        <tr>
          <td border="0" cellpadding="0" cellspacing="0" width="500px">
            <img src="https://cdn.discordapp.com/attachments/879193560598061087/887501955226816552/codehigh.png" style="display: flex; margin-top: 20px; margin-left: 20px;" alt="Some image" height="50" weight="100">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  
  <tr>
    <td>
      <table border="0" cellpadding="0" cellspacing="0" width="500px" style="padding: 20px; margin: 20px" bgcolor="#E1E1E1">
        <tr>
          <td>
            <div>
              ìëíì¸ì, ${name}ë.<br/>
              ìë ë²í¼ì ëë¬ ì´ë©ì¼ ì¸ì¦ì ìë£í´ì£¼ì¸ì.<br/>
              í´ë¹ ë§í¬ë 5ë¶ê° ì í¨í©ëë¤.
            </di>
            <div align="left" style="padding: 20px; margin: 20px" >
              <a href=${redirectURL} class="btn-ctf" target="_blank">ì´ë©ì¼ ì¸ì¦</a>
            </div>
            <div>
              <div>ë²í¼ì´ ë³´ì´ì§ ìëë¤ë©´,<br>ìë ì£¼ìë¡ ì ìí´ ì´ë©ì¼ ì¸ì¦ì ì§íí´ì£¼ì¸ì.<br>ê°ì¬í©ëë¤.
              <div style="margin-top: 10px">${redirectURL}</div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td></td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
    })
  } catch (err) {
    console.log(err);
  }
}


export const sendPasswordEmail = async (email: string, code: string) => {
  const redirectURL = `${process.env.CLIENT_ENDPOINT}/resetpassword?code=${code}`
  
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      }
    })

    let info = await transporter.sendMail({
      from: `"Code Highð" <${process.env.NODEMAILER_USER}>`,
      to: `${email}`,
      subject: "[Code High] ë¹ë°ë²í¸ ì¬ì¤ì ì ì§íí´ì£¼ì¸ì.",
      text: ``,
      html: `
      <style>
  .btn-ctf {
    background-color: #2f8c4c;
    color: #ffffff;
    padding: 20px 60px;
    border-radius: 10px;
    text-decoration: none;
  }
  td {
    font-size: 16px;
    line-height: 1.4;
    font-family: Arial, sans-serif;
    padding: {
      top: 0;
      right: 0;
      bottom: 30px;
      left: 0;
    }
  }
</style>

<table border="0" cellpadding="0" cellspacing="0" width="500px">
  <tr>
    <td bgcolor="#ffffff" style="font-size: 0; line-height: 0; height: 0;" height="0">
      <table>
        <tr>
          <td border="0" cellpadding="0" cellspacing="0" width="500px">
            <img src="https://cdn.discordapp.com/attachments/879193560598061087/887501955226816552/codehigh.png" style="display: flex; margin-top: 20px; margin-left: 20px;" alt="Some image" height="50" weight="100">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  
  <tr>
    <td>
      <table border="0" cellpadding="0" cellspacing="0" width="500px" style="padding: 20px; margin: 20px" bgcolor="#E1E1E1">
        <tr>
          <td>
            <div>
              ìëíì¸ì.<br/>
              ìë ë²í¼ì ëë¬ ë¹ë°ë²í¸ ì¬ì¤ì ì ì§íí´ì£¼ì¸ì.<br/>
              í´ë¹ ë§í¬ë 5ë¶ê° ì í¨í©ëë¤.
            </di>
            <div align="left" style="padding: 20px; margin: 20px" >
              <a href=${redirectURL} class="btn-ctf" target="_blank">ë¹ë°ë²í¸ ì¬ì¤ì </a>
            </div>
            <div>
              <div>ë²í¼ì´ ë³´ì´ì§ ìëë¤ë©´,<br>ìë ì£¼ìë¡ ì ìí´ ë¹ë°ë²í¸ ì¬ì¤ì ì ì§íí´ì£¼ì¸ì.<br>ê°ì¬í©ëë¤.
              <div style="margin-top: 10px">${redirectURL}</div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td></td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
    })
  } catch (err) {
    console.log(err);
  }
}