import nodemailer from 'nodemailer';
const Email = options => {
  let transpoter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('Thanh Cong');
    }
  });
};

const EmailSender = ({
  fullname,
  company_name,
  company_contact,
  email,
  email_contact,
  phone,
  description,
  isContact
}) => {
  const options1 = {
    from: process.env.EMAIL,
    to: email,
    cc: [email_contact, 'vjpconnect@vj-partner.com'],
    subject: `[VJP Connect][Viet Japan Digital]Có liên hệ/お問い合わせがあります。`,
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    
    <body>
      <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; gap: 2px; padding: 20px 0; display: grid">
            <div style="font-size: .8rem; margin: 0 30px; line-height: 1.2rem;">
              <p style="font-weight: 700;font-size: 13px;">※日本語内容は下にあります。</p>
              <p style="font-weight: 700;font-size: 13px;">Kính gửi ${company_name}</p>
              <p style="margin-top:20px">Hệ thống VJP Connect Platform chúng tôi có nhận được thông tin liên hệ từ
                <b>Anh/Chị</b> <b>${fullname}</b>- công ty <b
                  style="font-weight: 700;font-size: 13px;">${company_contact}</b> với nội dung yêu cầu như sau:</p>
              <span>------------------------------------</span>
              <p style="margin-top: 20px;font-size: 13px;">${description}</p>
              <span>------------------------------------</span>
              <p style="margin-top: 20px;font-size: 13px;">Vui lòng phản hồi từ <b>${email_contact} </b>này hoặc gọi số
                <b>${phone}</b> để trao đổi trực tiếp.</p>
    
              <p style="margin-top: 20px;font-size: 13px;">Xin chúc 2 quý công ty sẽ có giao dịch thành công.</p>
    
              <p style="margin-top: 20px;font-size: 13px;">Nếu cần liên hệ hỗ trợ thông dịch hoặc xúc tiến giao thương xin
                hãy liên hệ đến chúng tôi theo
                thông tin sau</p>
    
              <span style="margin-top: 20px;font-size: 13px;">Email: vjpconnect@vj-partner.com</span>
              <p>Phone&ZALO: (+84) (+84) 0908.60.68.92 </p>
              <span>Tổng đài tư vấn Zalo OA: https://zalo.me/vietjapanpartner</span>
              <p>Tổng đài tư vấn Line OA: https://lin.ee/YVZ69aX</p>
    
              <p style="margin-top: 20px;font-size: 13px;">Trân trọng</p>
              <span>======================================================================</span>
            </div>
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <div style="font-size: .8rem; margin: 0 30px">
              <p><b>[ここから日本語となります]</b></p>
              <p><b>${company_name}</b>様</p>
    
              <p>VJP Connect Platform からお問い合わせがありました。<b>${fullname}</b><b>様</b></p>
    
              <p><b>会社 - </b><b>${company_contact}</b> 以下のリクエスト内容で:</p>
    
              ------------------------------------
              <p>${description}</p>
              ------------------------------------
    
              <p style="margin-top: 20px;font-size: 13px;"><b>${email}</b> をご返信頂くか 「<b>${phone}」</b> までお電話ください。</p>
    
              <p style="margin-top: 20px;font-size: 13px;">両社の取引が成功することをお祈りします。</p>
    
              <p style="margin-top: 20px;font-size: 13px;">翻訳やビジネスプロモーションなどご希望がある場合は、下記の連絡先までご連絡くださいませ。</p>
    
              <p style="margin-top: 20px;font-size: 13px;">Email: vjpconnect@vj-partner.com</p>
              <p>Phone&ZALO: (+84) (+84) 0908.60.68.92 </p>
              <p>Zalo OA: https://zalo.me/vietjapanpartner</p>
              <p>Line OA: https://lin.ee/YVZ69aX</p>
    
              <p style="margin-top: 20px;font-size: 13px;">今後とも、どうぞ宜しくお願い致します。</p>
            </div>
          </div>
    
          <div style="width: 100%; gap: 10px; padding: 15px 0; display: grid; margin: 0 30px;line-height: 1.6">
            <div style="font-size: 13px; color: black; margin: 20px 0;">★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★</div>
            <h2 style="font-size: 13px;">VIET JAPAN PARTNER COOPERATION CO.LTD (VJPC)</h2>
            <div style="margin-left: 10px; font-size: 13px;">
    
              <p style="font-size: 13px;">Member of VIET JAPAN PARTNER GROUP (VJP GROUP)</p>
    
              <div style="margin-bottom: 20px;">
                <p><strong>Email:</strong> <a href="mailto:vjpconnect@vj-partner.com"
                    style="color: #007bff; text-decoration: none;">vjpconnect@vj-partner.com</a></p>
                <p><strong>Phone & ZALO:</strong> (+84) 908.60.68.92</p>
                <p><strong>Zalo OA:</strong> <a href="https://zalo.me/vietjapanpartner" target="_blank"
                    style="color: #007bff; text-decoration: none;">https://zalo.me/vietjapanpartner</a></p>
                <p><strong>Line OA:</strong> <a href="https://lin.ee/YVZ69aX" target="_blank"
                    style="color: #007bff; text-decoration: none;">https://lin.ee/YVZ69aX</a></p>
              </div>
    
              <div style="margin-top: 20px;">
                <p><strong>Address:</strong> P1.3-40, The Prince Residence, 17-19-21 Nguyen Van Troi Street, 14 Ward, Phu
                  Nhuan District, HCM City, Vietnam</p>
                <p><a href="https://maps.app.goo.gl/ksMxd9fV2aa72aNLA" target="_blank"
                    style="color: #007bff; text-decoration: none;">https://maps.app.goo.gl/ksMxd9fV2aa72aNLA</a></p>
              </div>
    
              <div style="margin-top: 20px;">
                <p><strong>WEBSITE:</strong> <a href="https://vietjapan.co" target="_blank"
                    style="color: #007bff; text-decoration: none;">https://vietjapan.co</a></p>
              </div>
    
              <div style="margin-top: 20px;">
                <p><strong>FB Fanpage:</strong> <a href="https://www.facebook.com/vjp.cooperation.vn" target="_blank"
                    style="color: #007bff; text-decoration: none;">https://www.facebook.com/vjp.cooperation.vn</a></p>
                <p><strong style="opacity: 0">FB Fanpage:</strong><a href="https://www.facebook.com/vjp.cooperation.jp"
                    target="_blank"
                    style="color: #007bff; text-decoration: none;">https://www.facebook.com/vjp.cooperation.jp</a></p>
              </div>
            </div>
            <div style="font-size: 13px; color: black; margin: 20px 0;">★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★</div>
          </div>
        </div>
    </body>
    
    </html>`,
  };

  const options2 = {
    from: process.env.EMAIL,
    to: email,
    cc: [email_contact, 'vjpconnect@vj-partner.com'],
    subject: `[VJP Connect] Message/お問い合わせ from ${company_name}`,
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    
    <body>
      <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; gap: 2px; padding: 15px 0; display: grid">
            <div style="font-size: .8rem; margin: 0 30px; line-height: 1.2rem;">
              <p style="font-weight: 700;font-size: 13px;">※日本語内容は下にあります。</p>
              <p style="font-weight: 700;font-size: 13px;">Kính gửi anh/chị ${company_name}</p>
              <p style="margin-top:20px">Xin cám ơn quý anh/chị liên hệ đến chúng tôi qua trang web
                VJP-CONNECT.COM</p>
              <p style="margin-top:20px">Xin phép gửi lại thông tin mà chúng tôi đã nhận được như sau:</p>
              <span>------------------------------------</span>
              <p style="margin-top: 20px;font-size: 13px;">
                <span>Họ tên: </span>
                ${fullname}
              </p>
              <p style="margin-top: 20px;font-size: 13px;">
                <span>Email: </span>
                ${email_contact}
              </p>
              <p style="margin-top: 20px;font-size: 13px;">
                <span>Công ty: </span>
                ${company_contact}
              </p>
              <p style="margin-top: 20px;font-size: 13px;">
                <span>Điện thoại: </span>
                ${phone}
              </p>
              <p style="margin-top: 20px;font-size: 13px;">
                <span>Nội dung liên hệ: </span>
                ${description}
              </p>
              <span>------------------------------------</span>
              <p style="margin-top: 20px;font-size: 13px;">Tư vấn viên sẽ sớm liên hệ đến anh chị qua email hoặc
                điện thoại.</p>
    
              <p style="margin-top: 20px;font-size: 13px;">Trường hợp thông tin này không chính xác vui lòng thông
                báo lại chúng tôi khi có tư vấn viên liên hệ đến.</p>
    
              <p style="margin-top: 20px;font-size: 13px;">Trường hợp muốn cần phản hồi nhanh vui lòng liên hệ đến
                các kênh hỗ trợ sau:</p>
    
              <span style="margin-top: 20px;font-size: 13px;">Phone&ZALO: (+84) 908.60.68.92</span>
              <p>Tổng đài tư vấn Zalo OA: https://zalo.me/vietjapanpartner</p>
              <span>Tổng đài tư vấn Line OA: https://lin.ee/YVZ69aX</span>
              <p>Email: vjpconnect@vj-partner.com </p>
    
              <p style="margin-top: 20px;font-size: 13px;">Trân trọng</p>
              <span>======================================================================</span>
            </div>
          </div>
          <div style="width: 100%; gap: 10px; padding: 15px 0; display: grid">
            <div style="font-size: .8rem; margin: 0 30px">
              <p><b>[ここから日本語となります]</b></p>
              <p style="font-weight: 700;font-size: 13px;">${company_name}様</p>
    
              <p style="margin-top:20px">「VJP-CONNECT.COM」を通じて、お問い合わせ頂きありがとうございます。</p>
    
              <p style="margin-top:20px">下記の情報を受け取りました。</p>
              <span>------------------------------------</span>
              <p style="margin-top: 20px;font-size: 13px;">
                <span>Họ tên: </span>
                ${fullname}
              </p>
              <p style="margin-top: 20px;font-size: 13px;">
                <span>Email: </span>
                ${email_contact}
              </p>
              <p style="margin-top: 20px;font-size: 13px;">
                <span>Công ty: </span>
                ${company_contact}
              </p>
              <p style="margin-top: 20px;font-size: 13px;">
                <span>Điện thoại: </span>
                ${phone}
              </p>
              <p style="margin-top: 20px;font-size: 13px;">
                <span>Nội dung liên hệ: </span>
                ${description}
              </p>
              ------------------------------------
    
              <p style="margin-top: 20px;font-size: 13px;">弊社のコンサルタントがメール又は電話でご連絡させていただきます。</p>
    
              <p style="margin-top: 20px;font-size: 13px;">この情報が間違っている場合は、コンサルタントから連絡があった際にお知らせください。</p>
    
              <p style="margin-top: 20px;font-size: 13px;">迅速な対応が必要な場合は、次のサポート チャネルにご連絡ください。</p>
    
              <span style="margin-top: 20px;font-size: 13px;">Phone&ZALO: (+84) 908.60.68.92</span>
              <p>Tổng đài tư vấn Zalo OA: https://zalo.me/vietjapanpartner</p>
              <span>Tổng đài tư vấn Line OA: https://lin.ee/YVZ69aX</span>
              <p>Email: vjpconnect@vj-partner.com </p>
    
              <p style="margin-top: 20px;font-size: 13px;">今後とも、どうぞ宜しくお願い致します。</p>
            </div>
          </div>
    
          <div style="width: 100%; gap: 10px; padding: 15px 0; display: grid; margin: 0 30px;line-height: 1.6">
            <div style="font-size: 13px; color: black; margin: 20px 0;">★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
            </div>
            <h2 style="font-size: 13px;">VIET JAPAN PARTNER COOPERATION CO.LTD (VJPC)</h2>
            <div style="margin-left: 10px; font-size: 13px;">
    
              <p style="font-size: 13px;">Member of VIET JAPAN PARTNER GROUP (VJP GROUP)</p>
    
              <div style="margin-bottom: 20px;">
                <p><strong>Email:</strong> <a href="mailto:vjpconnect@vj-partner.com"
                    style="color: #007bff; text-decoration: none;">vjpconnect@vj-partner.com</a></p>
                <p><strong>Phone & ZALO:</strong> (+84) 908.60.68.92</p>
                <p><strong>Zalo OA:</strong> <a href="https://zalo.me/vietjapanpartner" target="_blank"
                    style="color: #007bff; text-decoration: none;">https://zalo.me/vietjapanpartner</a></p>
                <p><strong>Line OA:</strong> <a href="https://lin.ee/YVZ69aX" target="_blank"
                    style="color: #007bff; text-decoration: none;">https://lin.ee/YVZ69aX</a></p>
              </div>
    
              <div style="margin-top: 20px;">
                <p><strong>Address:</strong> P1.3-40, The Prince Residence, 17-19-21 Nguyen Van Troi Street, 14
                  Ward, Phu Nhuan District, HCM City, Vietnam</p>
                <p><a href="https://maps.app.goo.gl/ksMxd9fV2aa72aNLA" target="_blank"
                    style="color: #007bff; text-decoration: none;">https://maps.app.goo.gl/ksMxd9fV2aa72aNLA</a>
                </p>
              </div>
    
              <div style="margin-top: 20px;">
                <p><strong>WEBSITE:</strong> <a href="https://vietjapan.co" target="_blank"
                    style="color: #007bff; text-decoration: none;">https://vietjapan.co</a></p>
              </div>
    
              <div style="margin-top: 20px;">
                <p><strong>FB Fanpage:</strong> <a href="https://www.facebook.com/vjp.cooperation.vn"
                    target="_blank"
                    style="color: #007bff; text-decoration: none;">https://www.facebook.com/vjp.cooperation.vn</a>
                </p>
                <p><strong style="opacity: 0">FB Fanpage:</strong><a
                    href="https://www.facebook.com/vjp.cooperation.jp" target="_blank"
                    style="color: #007bff; text-decoration: none;">https://www.facebook.com/vjp.cooperation.jp</a>
                </p>
              </div>
            </div>
            <div style="font-size: 13px; color: black; margin: 20px 0;">★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
            </div>
          </div>
        </div>
    </body>
    
    </html>`,
  };

  Email(!isContact ? options1 : options2);
};

export default EmailSender;
