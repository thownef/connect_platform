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

const EmailSenderUser = ({
  fullname,
  company_name,
  email,
  phone,
}) => {
  const options = {
    from: process.env.EMAIL,
    to: email,
	cc: ['vjpconnect@vj-partner.com'],
    subject: 'Đã tiếp nhận đăng ký Tài khoản / 会員登録を受け取りました',
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
						<p style="font-weight: 700;font-size: 13px;">Kính gửi quý  anh/chị ${fullname}</p>
						<p style="margin-top:10px">Cám ơn quý anh chị đã đăng ký tài khoản trên nền tảng kế nối giao thương
							online VJP Connect platform.</p>
						<p style="margin-top:10px">Chúng tôi sẽ kiểm tra thông tin và thông báo kết quả sớm đến anh/chị.</p>
						<p style="margin-top:10px">Sau đây là thông tin đăng ký chúng tôi nhận được, trong trường hợp thông
							tin này có sai khác anh/chị vui lòng trả lời email này hoặc liên hệ đến kênh liên hệ bên dưới
							email.</p>
						<span>------------------------------------</span>
						<p style="margin-top: 20px;font-size: 13px;">
							<span>Tên công ty: </span>
							${company_name}
						</p>
						<p style="margin-top: 20px;font-size: 13px;">
							<span>Email: </span>
							${email}
						</p>
						<p style="margin-top: 20px;font-size: 13px;">
							<span>Họ và tên: </span>
							${fullname}
						</p>
						<p style="margin-top: 20px;font-size: 13px;">
							<span>Điện thoại: </span>
							${phone}
						</p>
						<span>------------------------------------</span>
						<p style="margin-top: 20px;font-size: 13px;">Nếu cần liên hệ hỗ trợ thông dịch hoặc xúc tiến giao
							thương xin hãy liên hệ đến chúng tôi theo
							thông tin sau</p>
	
						<span style="margin-top: 20px;font-size: 13px;">Email: vjpconnect@vj-partner.com</span>
						<p>Phone&ZALO: (+84) 908.60.68.92</p>
						<span>Tổng đài tư vấn Zalo OA: https://zalo.me/vietjapanpartner</span>
						<p>Tổng đài tư vấn Line OA: https://lin.ee/YVZ69aX</p>
	
						<p style="margin-top: 20px;font-size: 13px;">Trân trọng</p>
						<span>======================================================================</span>
					</div>
				</div>
				<div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
					<div style="font-size: .8rem; margin: 0 30px">
						<p><b>[ここから日本語となります]</b></p>
						<p><b>${fullname}</b>様</p>
						<p style="margin-top:10px">この度、 オンラインビジネスマッチング支援プラットフォーム ・VJP Connect に</p>
						<p style="margin-top:10px">アカウントをご登録いただきありがとうございます。</p>
						<p style="margin-top:10px">情報を確認し、結果を近日中にお知らせいたします。</p>
						<p style="margin-top:10px">ご登録内容は以下となりますが、もし相違がある場合は、本メールにご返信いただくか、メールの下に記載されたチャンネルまでご連絡ください。</p>
						------------------------------------
						<p style="margin-top: 20px;font-size: 13px;">
							<span>会社名: </span>
							${company_name}
						</p>
						<p style="margin-top: 20px;font-size: 13px;">
							<span>メールアドレス: </span>
							${email}
						</p>
						<p style="margin-top: 20px;font-size: 13px;">
							<span>ユーザー名: </span>
							${fullname}
						</p>
						<p style="margin-top: 20px;font-size: 13px;">
							<span>お電話番号: </span>
							${phone}
						</p>
						------------------------------------
						<p style="margin-top: 20px;font-size: 13px;">翻訳やビジネスプロモーションなどご希望がある場合は、下記の連絡先までご連絡くださいませ。</p>
	
						<p style="margin-top: 20px;font-size: 13px;">Email: vjpconnect@vj-partner.com</p>
						<p>Phone&ZALO: (+84) (+84) 0908.60.68.92 </p>
						<p>Zalo OA: https://zalo.me/vietjapanpartner</p>
						<p>Line OA: https://lin.ee/YVZ69aX</p>
	
						<p style="margin-top: 20px;font-size: 13px;">今後とも、どうぞ宜しくお願い致します。</p </div>
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
										style="color: #007bff; text-decoration: none;">https://zalo.me/vietjapanpartner</a>
								</p>
								<p><strong>Line OA:</strong> <a href="https://lin.ee/YVZ69aX" target="_blank"
										style="color: #007bff; text-decoration: none;">https://lin.ee/YVZ69aX</a></p>
							</div>
	
							<div style="margin-top: 20px;">
								<p><strong>Address:</strong> P1.3-40, The Prince Residence, 17-19-21 Nguyen Van Troi Street,
									14
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

export default EmailSenderUser;
