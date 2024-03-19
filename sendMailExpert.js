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

const EmailSenderExpert = ({
  fullname,
  expert_name,
  company_name,
  email,
  phone,
  content,
}) => {
  const options = {
    from: process.env.EMAIL,
    to: email,
    subject: '[VJP Connect]Có thông tin liên hệ/お問い合わせがあります。',
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
                            <p style="font-weight: 700;font-size: 13px;">Kính gửi ông/bà ${expert_name}</p>
                            <p style="margin-top:20px">Hệ thống VJP Connect Platform chúng tôi có nhận được thông tin liên hệ từ <b>Anh/Chị</b> <b>${fullname}</b>- công ty <b style="font-weight: 700;font-size: 13px;">${company_name}</b> với nội dung yêu cầu như sau:</p>
                            <span>------------------------------------</span>       
                            <p style="margin-top: 20px;font-size: 13px;">${content}</p>
                            <span>------------------------------------</span>
                            <p style="margin-top: 20px;font-size: 13px;">Vui lòng phản hồi bằng email này hoặc gọi số <b>${phone}</b> để trao đổi trực tiếp.</p>
                            
                            <p style="margin-top: 20px;font-size: 13px;">Nếu cần liên hệ hỗ trợ thông dịch hoặc xúc tiến giao thương xin hãy liên hệ đến chúng tôi theo
                            thông tin sau</p>

                            <span style="margin-top: 20px;font-size: 13px;" >Email: vjpconnect@vj-partner.com</span>
                            <p>Phone&ZALO: (+84) 908.60.68.92</p>
                            <span>Tổng đài tư vấn Zalo OA:  https://zalo.me/vietjapanpartner</span>
                            <p>Tổng đài tư vấn Line OA:   https://lin.ee/YVZ69aX</p>
                            
                            <p style="margin-top: 20px;font-size: 13px;" >Trân trọng</p>
                            <span>======================================================================</span>
                            </div>
                        </div>       
                    <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
                        <div style="font-size: .8rem; margin: 0 30px">
                            <p><b>[ここから日本語となります]</b></p>
                            <p><b>${expert_name}</b>様</p>
                            
                            <p>VJP Connect Platform からお問い合わせがありました。<b>${fullname}</b><b>様</b></p>
                            
                            <p><b>会社 - </b><b>${company_name}</b> 以下のリクエスト内容で:</p>
                            
                            ------------------------------------
                            <p>${content}</p>
                            ------------------------------------
                            <p style="margin-top: 20px;font-size: 13px;">本メールをご返信頂くか「${phone}」 までお電話ください。</p>
                            
                            <p style="margin-top: 20px;font-size: 13px;">翻訳やビジネスプロモーションなどご希望がある場合は、下記の連絡先までご連絡くださいませ。</p>
                            
                            <p style="margin-top: 20px;font-size: 13px;">Email: vjpconnect@vj-partner.com</p>
                            <p>Phone&ZALO: (+84) (+84) 0908.60.68.92 </p>
                            <p>Zalo OA:  https://zalo.me/vietjapanpartner</p>
                            <p>Line OA:   https://lin.ee/YVZ69aX</p>
    
                            <p style="margin-top: 20px;font-size: 13px;">今後とも、どうぞ宜しくお願い致します。</p
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

  Email(options);
};

export default EmailSenderExpert;
