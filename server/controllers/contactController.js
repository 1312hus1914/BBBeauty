// controllers/contactController.js
const nodemailer = require("nodemailer");

exports.sendContactEmail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Моля, попълнете име, e-mail и съобщение." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // 465 почти винаги е secure:true
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // по желание – проверка дали smtp настройките работят
    // await transporter.verify();

    await transporter.sendMail({
      from: `"Сайт – контакт форма" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: `Ново запитване от сайта – ${name}`,
      replyTo: email,
      text: `Име: ${name}\nEmail: ${email}\n\nСъобщение:\n${message}`,
    });

    return res.status(200).json({ message: "Съобщението е изпратено успешно." });
  } catch (err) {
    console.error("Грешка при изпращане на имейл:", err); // <-- много важно

    // ако искаш да върнем причината към фронта (за дебъг)
    return res
      .status(500)
      .json({ message: "Грешка при изпращане на имейл: " + err.message });

    // или, ако предпочиташ да мине през глобалния errorHandler:
    // next(err);
  }
};
