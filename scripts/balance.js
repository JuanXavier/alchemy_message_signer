require("dotenv").config();

const nodemailer = require("nodemailer");
const TelegramBot = require("node-telegram-bot-api");
const { ENDPOINT, EMAIL_USER, EMAIL_PASS, EMAIL_RECIPIENT, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;
const { ethers } = require("ethers");

const sliceAddr = (addr) => addr.slice(0, 4) + "..." + addr.slice(-4);

const main = async (targetAddress) => {
    const provider = new ethers.JsonRpcProvider(ENDPOINT);
    const threshold = 1;

    try {
        const balanceEther = ethers.formatEther(await provider.getBalance(targetAddress));
        const formattedBalance = parseFloat(balanceEther).toFixed(6);
        const message = `Current balance of ${sliceAddr(targetAddress)} is: ${formattedBalance} ETH.`;
        console.log(message);

        if (formattedBalance > threshold) {
            /* ---------------- TELEGRAM NOTIFICATION ---------------- */
            const bot = new TelegramBot(TELEGRAM_TOKEN);
            bot.sendMessage(TELEGRAM_CHAT_ID, message);

            /* ---------------- EMAIL NOTIFICATION ---------------- */
            const transporter = nodemailer.createTransport({
                service: "outlook",
                auth: { user: EMAIL_USER, pass: EMAIL_PASS },
            });

            const mailOptions = { from: EMAIL_USER, to: EMAIL_RECIPIENT, subject: "Balance Alert", text: message };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.error("Error sending email:", error);
                else console.log("Email notification sent:", info.response);
            });
        }
    } catch (err) {
        console.error("Something went wrong:\n " + err);
    }
};

const args = process.argv.slice(2);
const targetAddress = args[0];

main(targetAddress);
